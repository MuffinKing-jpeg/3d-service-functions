// eslint-disable-next-line max-len
import {adjectives, Config, names, uniqueNamesGenerator} from 'unique-names-generator';
import {randomBytes} from 'crypto';

export const namesRandomizer = (
    bytesLength: number
) => {
  const customConfig: Config = {
    dictionaries: [adjectives, names],
    separator: '-',
    length: 2,
  };
    // eslint-disable-next-line max-len
  const randomName: string = uniqueNamesGenerator(
      customConfig
  ); // big_red_donkey
  const seed = randomBytes(bytesLength);
  return seed.toString('hex') +
        '-' + randomName;
};
