// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';
import {CRM_CONFIG} from '../crm.config';
import axios from 'axios';
import {crmAuth} from './crmAuth';
// eslint-disable-next-line max-len
import {buildPayload} from '../utility/buildPayload';
import {namesRandomizer} from '../utility/namesRandomizer';

export const manageAccount = (
    fields: FieldTransformedInterface,
    method: 'post' | 'patch' | 'delete',
    id: string,
) => {
  return new Promise((resolve, reject) => {
    const createURL = new URL(
        CRM_CONFIG.BASE_URL +
            CRM_CONFIG.API_PATH +
            CRM_CONFIG.API_VERSION +
            CRM_CONFIG.MODULE_PATH
    );

    const accountInfo = buildPayload(fields, 'Account', id);
    if (
      !accountInfo.data.attributes['name'] && method === 'post'
    ) {
      accountInfo.data.attributes['name'] = namesRandomizer(3);
    }

    axios({
      method: method,
      url: createURL.toString(),
      data: accountInfo,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + crmAuth.TOKEN,
      },
    })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
  });
};


