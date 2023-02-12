import {https} from 'firebase-functions';
import {crmAuth} from '../crm/crmAuth';

export const authDebug = https.onRequest((request, response) => {
  response.contentType('application/json');
  crmAuth
      .login()
      .then(() => {
        response.send({status: 200, massage: 'Login successful'});
      })
      .catch((err) => {
        response.send({
          status: 500,
          error: err,
        });
      })
  ;
});
