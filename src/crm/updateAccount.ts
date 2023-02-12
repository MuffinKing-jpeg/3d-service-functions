import {buildPayload} from '../utility/buildPayload';
// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';

export const updateAccount = (
    fields: FieldTransformedInterface,
    id: string
) => {
  return new Promise((resolve, reject) => {
    const accountInfo = buildPayload(fields, 'Account', id);

    resolve([fields, id]);
  });
};
