import { firebaseConfig } from './firebase-config';

export const environment = {
  production: true,
  firebaseConfig: firebaseConfig,
  firestore: {
    version: '1.0',
  },
};
