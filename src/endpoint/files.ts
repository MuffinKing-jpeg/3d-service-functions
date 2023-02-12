import {https} from 'firebase-functions';
import express from 'express';
import {firebase} from '../firebase/firebase';
import {ResponseConfigInterface} from '../interfaces/responseConfig.interface';
import {errorResponse} from '../utility/errorResponse';


const app = express();

app.get('/:id', (req, res) => {
  const response = (config: ResponseConfigInterface) => {
    res
        .status(config.status)
        .send({
          status: config.status,
          data: config.data,
          message: config.msg,
        });
  };

  firebase.bucket.getFiles({
    prefix: `files/${req.params.id}/`,
  })
      .then((files) => {
        // console.log(files[0]);
        if (files[0] && files[0].length !== 0) {
          const filesData = files[0];
          const filesInfo = [];

          for (let i = 0; i < filesData.length; i++) {
            const metaData = filesData[i].metadata;
            filesInfo.push({
              name: metaData['name'],
              contentType: metaData['contentType'],
              mediaLink: metaData['mediaLink'],
              size: metaData['size'],
              created: metaData['timeCreated'],
            });
          }

          response({
            msg: 'Success',
            status: 200,
            data: filesInfo,
          });
        } else {
          response({
            status: 400,
            msg: 'No such files',
          });
        }
      })
      .catch((err) => {
        response(errorResponse(err, 'Something went wrong'));
      });
});
export const files = https.onRequest(app);
