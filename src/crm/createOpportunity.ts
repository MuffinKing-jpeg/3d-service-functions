import {CRM_CONFIG} from '../crm.config';
import {namesRandomizer} from '../utility/namesRandomizer';
import axios from 'axios';
import {crmAuth} from './crmAuth';

export const createOpportunity = (
    data: any,
    id: string,
    description: string,
    npAddress: string) => {
  return new Promise((resolve, reject) => {
    const opportunityUrl = new URL(
        CRM_CONFIG.BASE_URL +
            CRM_CONFIG.API_PATH +
            CRM_CONFIG.API_VERSION +
            CRM_CONFIG.MODULE_PATH
    );
    const opportunityData = {
      data: {
        type: 'Opportunity',
        id: id,
        attributes: {
          name: namesRandomizer(2),
          account_id: data['data']['id'],
          description: description,
          new_task_c: true,
          np_address_c: npAddress,
          dedication_c: '3d_print',
          files_c: `https://printspeed-3d.web.app/files/${id}`,
        },
      },
    };

    axios({
      method: 'post',
      url: opportunityUrl.toString(),
      data: opportunityData,
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
