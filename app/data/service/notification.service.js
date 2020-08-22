import request from "request";
import admin from 'firebase-admin'
import { google } from 'googleapis'
import serviceAccount from '../../../project-3846619950915507874-firebase-adminsdk-7wo7f-9f5225ae5e.json'

const databaseURL = 'https://project-3846619950915507874.firebaseio.com'
const URL = 'https://fcm.googleapis.com/v1/projects/project-3846619950915507874/messages:send'
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
const SCOPES = [MESSAGING_SCOPE]

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
})

export default class NotificationService {

  getAccessToken() {
    return new Promise((resolve, reject) => {
      let key = serviceAccount
      let jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      )
      jwtClient.authorize((err, tokens) => {
        if (err) {
          reject(err)
          return
        }
        resolve(tokens.access_token)
      })
    })
  }

  async sendNotification(deviceToken) {
    const body = {
      message: {
        data: {key: 'value'},
        notification: {
          title: 'Notification title',
          body: 'Notification body'
        },
        token: deviceToken
      }
    }
    const accessToken = await this.getAccessToken()
    console.log('accessToken: ', accessToken)
    request({
      url: URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      method: 'POST',
      json: body
    }, (error, response, body) => {
      console.log('body: ', body)
    })
  }
}
