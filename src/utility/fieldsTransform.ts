import {FieldInterface} from '../interfaces/field.interface';
// eslint-disable-next-line max-len
import {FieldTransformedInterface} from '../interfaces/fieldTransformed.interface';

export const transform = (
    fields: FieldInterface[]
): Promise<FieldTransformedInterface> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(fieldsTransform(fields));
    } catch (e) {
      reject(e);
    }
  });
};
const fieldsTransform = (fields: FieldInterface[]):
    FieldTransformedInterface => {
  const transformed: FieldTransformedInterface = {};

  const regExpTG = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/igm;

  for (let i = 0; i < fields.length; i++) {
    const tmp = fields[i].data.toString();

    switch (fields[i].name) {
      case 'telegram_c':
        if (regExpTG.test(tmp)) {
          transformed.telegram_c = 'https://t.me/' + tmp.substring(1);
        } else {
          throw new Error('Bad TG tag');
        }
        break;
      case 'material':
        transformed.material = tmp;
        break;
      case 'phone_alternate':
        transformed.phone_alternate = tmp;
        break;
      case 'phone_office':
        transformed.phone_office = tmp;
        break;
      case 'name':
        transformed.name = tmp;
        break;
    }
    // tmp && fields[i].name === 'telegram' ?
    //   transformed.telegram = tmp :
    //   null;
  }
  return transformed;
};
