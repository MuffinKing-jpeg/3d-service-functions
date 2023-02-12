// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';
import {CRM_CONFIG} from '../crm.config';
import axios from 'axios';
import {crmAuth} from './crmAuth';
import {CrmResponseInterface} from '../interfaces/crmResponse.interface';

export const searchAccount = (
    fields: FieldTransformedInterface
): Promise<CrmResponseInterface> => {
  return new Promise((resolve, reject) => {
    const searchUrl = new URL(
        CRM_CONFIG.BASE_URL +
            CRM_CONFIG.API_PATH +
            CRM_CONFIG.API_VERSION +
            CRM_CONFIG.MODULE_PATH +
            CRM_CONFIG.ACCOUNTS_PATH,
    );

    crmAuth
        .login()
        .then(() => {
          searchUrl.searchParams.set('fields[Accounts]',
              'name,phone_office,phone_alternate,telegram_c');
          searchUrl.searchParams.set('filter[operator]', 'or');
          for (let i = 0; i < CRM_CONFIG.SEARCH_PARAMS.length; i++) {
            if (fields[CRM_CONFIG.SEARCH_PARAMS[i]]) {
              searchUrl.searchParams.set(
                  `filter[${CRM_CONFIG.SEARCH_PARAMS[i]}][eq]`,
                  fields[CRM_CONFIG.SEARCH_PARAMS[i]]
              );
            }
          }
          axios({
            method: 'get',
            url: searchUrl.toString(),
            headers: {
              'Content-Type': 'application/vnd.api+json',
              'Accept': 'application/vnd.api+json',
              'Authorization': 'Bearer ' + crmAuth.TOKEN,
            },
          })
              .then((data) => {
                data.data;
                resolve({
                  data: data.data,
                  fields: fields,
                });
              })
              .catch((err) => {
                reject(err);
              });
        })
        .catch((err) => {
          reject(err);
        });
  });
};
