// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';
import {CRM_CONFIG} from '../crm.config';
import axios from 'axios';
import {crmAuth} from '../crm/crmAuth';
// eslint-disable-next-line max-len
import {buildPayload} from '../utility/buildPayload';
import {namesRandomizer} from '../utility/namesRandomizer';

export const createAccount = (
    fields: FieldTransformedInterface,
    id: string
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
      !accountInfo.data.attributes['name']
    ) {
      accountInfo.data.attributes['name'] = namesRandomizer(3);
    }

    axios({
      method: 'post',
      url: createURL.toString(),
      data: accountInfo,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': 'Bearer ' + crmAuth.TOKEN,
      },
    })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
  });
};


