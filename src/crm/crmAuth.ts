import axios from 'axios';
import {CRM_CONFIG} from '../crm.config';

export class CrmAuth {
  public TOKEN!: string;
  private readonly ID!: string;
  private readonly SECRET!: string;

  constructor() {
    if (process.env['CRM_CLIENT_ID']) {
      this.ID = process.env['CRM_CLIENT_ID'];
    } else {
      throw new Error('No client id');
    }
    if (process.env['CRM_CLIENT_SECRET']) {
      this.SECRET = process.env['CRM_CLIENT_SECRET'];
    } else {
      throw new Error('No client secret');
    }
  }

  public login(): Promise<void> {
    return axios({
      method: 'post',
      url:
        CRM_CONFIG.BASE_URL +
        CRM_CONFIG.API_PATH +
        CRM_CONFIG.ACCESS_TOKEN_PATH,
      data: {
        'grant_type': 'client_credentials',
        'client_id': this.ID,
        'client_secret': this.SECRET,
      },
    })
        .then((res) => {
          if (res.data || res.data['access_token']) {
            this.TOKEN = res.data['access_token'];
          } else {
            throw new Error(`Login fail: ${res.data}`);
          }
        });
  }
}

export const crmAuth = new CrmAuth();
