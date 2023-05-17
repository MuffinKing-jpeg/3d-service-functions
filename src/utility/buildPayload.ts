import {CRM_CONFIG} from '../crm.config';
// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';

export const buildPayload = (
    fields: FieldTransformedInterface,
    type: string,
    id: string
) => {
  const accountInfo: { [index: string]: any } = {
    data: {
      type: type,
      id: id,
      attributes: {},
    },
  };

  Object
      .getOwnPropertyNames(fields)
      .forEach((key) => {
        if (CRM_CONFIG.SEARCH_PARAMS.includes(key)) {
          accountInfo['data'].attributes[key] = fields[key];
        }
      });
  return accountInfo;
};
