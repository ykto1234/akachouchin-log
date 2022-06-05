import * as fs from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

const dotenv = config()?.parsed;

// システムの環境変数でも動かせるようにデフォルトはシステムの環境変数にする
const env = {
  apiKey: process.env['API_KEY'],
  authDomain: process.env['AUTH_DOMAIN'],
  projectId: process.env['PROJECT_ID'],
  storageBucket: process.env['STORAGE_BUCKET'],
  messagingSenderId: process.env['MESSAGING_SENDER_ID'],
  appId: process.env['APP_ID'],
  measurementId: process.env['MEASUREMENT_ID'],
};

// .envが読めた場合は、.envの内容を設定
if (dotenv) {
  env.apiKey = dotenv['API_KEY'];
  env.authDomain = dotenv['AUTH_DOMAIN'];
  env.projectId = dotenv['PROJECT_ID'];
  env.storageBucket = dotenv['STORAGE_BUCKET'];
  env.messagingSenderId = dotenv['MESSAGING_SENDER_ID'];
  env.appId = dotenv['APP_ID'];
  env.measurementId = dotenv['MEASUREMENT_ID'];
}

// firebaseConfig.tsに書き込み
const contents = 'export const firebaseConfig = ' + JSON.stringify(env);
fs.writeFileSync(join(__dirname, '../src/environments/firebase-config.ts'), contents);
