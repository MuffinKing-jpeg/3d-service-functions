import {config as envConf} from 'dotenv';

envConf();


export {authDebug} from './endpoint/authDebug';
export {newApplication} from './endpoint/newApplication';
export {files} from './endpoint/files';
