// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';

export const defineSearchMethod = (
    fields: FieldTransformedInterface
) => {
  let tmp!: string;

  Object
      .getOwnPropertyNames(fields)
      .forEach((key) => {
        if (fields[key]) {
          switch (key) {
            case 'phone_office':
              tmp = 'phone_office';
              break;
            case 'phone_alternate':
              tmp = 'phone_alternate';
              break;
            case 'telegram_c':
              tmp = 'telegram_c';
              break;
          }
        }
      });

  if (!tmp) throw new Error('No contacts specified');

  return tmp;
};
