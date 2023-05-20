import {config} from 'dotenv';

config();


export {authDebug} from './endpoint/authDebug';
export {newApplication} from './endpoint/newApplication';
export {files} from './endpoint/files';
