import {https} from 'firebase-functions';
import express from 'express';
import {getBoundary, parse} from 'parse-multipart-data';
import {FieldInterface} from '../interfaces/field.interface';
import {fileUpload} from '../utility/fileUpload';
import {searchAccount} from '../crm/searchAccount';
import {transform} from '../utility/fieldsTransform';
import {randomUUID} from 'crypto';
import {crmAuth} from '../crm/crmAuth';
import {ResponseConfigInterface} from '../interfaces/responseConfig.interface';
import {updateOrCreate} from '../crm/updateOrCreate';
import {errorResponse} from '../utility/errorResponse';
import {createOpportunity} from '../crm/createOpportunity';

const app = express();
app.post('/', (req, res) => {
  const response = (config: ResponseConfigInterface) => {
    res
        .status(config.status)
        .send({
          status: config.status,
          data: config.data,
          message: config.msg,
        });
  };


  const ID = randomUUID();
  if (req.headers['content-type']) {
    const boundary = getBoundary(req.headers['content-type']);
    const body = req.body;
    const parts = parse(body, boundary);
    const files: FieldInterface[] = [];
    const fields: FieldInterface[] = [];
    let description!: string;
    let npAddress!: string;
    for (let i = 0; i < parts.length; i++) {
            parts[i]['filename'] || parts[i]['type'] ?
                files.push(parts[i]) :
                fields.push(parts[i]);
            if (parts[i]['name'] === 'description') {
              description = parts[i].data.toString();
            }
            if (parts[i]['name'] === 'np_addresss') {
              npAddress = parts[i].data.toString();
            }
    }

    crmAuth
        .login()
        .then(() => {
          Promise
              .all([
                fileUpload(files, ID),
                transform(fields)
                    .then((data) => searchAccount(data))
                    .then((data) => updateOrCreate(data))
                    .then((data) => createOpportunity(
                        data,
                        ID,
                        description,
                        npAddress
                    )),
              ])
              .then((data) => {
                response({
                  data: data,
                  msg: 'success',
                  status: 200,
                });
              })
              .catch((err) => {
                console.log(err);
                response(errorResponse(err, 'Something went wrong'));
              });
        })
        .catch((err) => {
          response(errorResponse(err, 'Login fail'));
        });
  }
});

export const newApplication = https.onRequest(app);

