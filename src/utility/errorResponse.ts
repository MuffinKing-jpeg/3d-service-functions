import {AxiosError} from 'axios';

export const errorResponse = (err: AxiosError, text: string) => {
  return {
    data: err.response?.data ? err.response?.data : err.message,
    msg: text,
    status: err.response?.status ? err.response?.status : 500,
  };
};
