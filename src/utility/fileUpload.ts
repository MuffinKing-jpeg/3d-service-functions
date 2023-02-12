import {FieldInterface} from '../interfaces/field.interface';
import {writeFile} from 'fs/promises';
import {tmpdir} from 'os';
import {firebase} from '../firebase/firebase';

const bucket = firebase.bucket;
export const fileUpload = (files: FieldInterface[], ID: string) => {
  return new Promise((resolve, reject) => {
    if (files.length === 0) {
      resolve(null);
    } else {
      if (files.length >= 32) reject(new Error('To many files'));
      const writeQuery: Promise<void>[] = [];
      const writePath: { location: string, name?: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        writePath.push({
          location: `${tmpdir()}/` + files[i].filename,
          name: files[i].filename,
        });
        writeQuery.push(saveFile(files[i].data, writePath[i].location));
      }
      Promise
          .all(writeQuery)
          .then(() => {
            const uploadQuery: Promise<unknown>[] = [];
            for (let i = 0; i < writePath.length; i++) {
              uploadQuery
                  .push(uploadFile(ID, writePath[i]));
            }
            Promise
                .all(uploadQuery)
                .then(() => {
                  resolve(ID);
                });
          })
          .catch((err) => {
            reject(new Error(`Unable to write files: ${err.message}`));
          });
    }
  });
};

const saveFile = (fileData: Buffer, path: string) => {
  return writeFile(path, fileData);
};

const uploadFile = (
    folder: string,
    file: { location: string, name?: string }
) => {
  return bucket.upload(file.location, {
    destination: 'files/' + folder + '/' + file.name,
  });
};
