import * as admin from 'firebase-admin';
import {app} from 'firebase-admin';
import {Bucket} from '@google-cloud/storage';
import {FIREBASE_CONFIG} from '../firebase.config';
import App = app.App;

class Firebase {
  public bucket: Bucket;
  private adminApp: App;

  constructor() {
    this.adminApp = admin.initializeApp();
    this.bucket = this.adminApp.storage().bucket(FIREBASE_CONFIG.BUCKET_ID);
  }
}

export const firebase = new Firebase();
