import {CrmResponseInterface} from '../interfaces/crmResponse.interface';
import {manageAccount} from './manageAccount';
import {randomUUID} from 'crypto';

export const updateOrCreate = (data: CrmResponseInterface) => {
  return new Promise((resolve, reject) => {
    if (
      data['data']['meta'] &&
            data['data']['meta']['message'] ===
            'Request was successful, but there is no result'
    ) {
      manageAccount(data.fields, 'post', randomUUID())
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    } else {
      manageAccount(
          data.fields,
          'patch',
          data.data['data'][0]['id'])
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    }
  });
};
