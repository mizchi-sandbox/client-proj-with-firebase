/* @flow */
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { firebaseConfig, firebaseUiConfig } from '../../config'

global.firebase = firebase

export function getFirebase (): any {
  return firebase
}

type User = {}

export function getLoginUser (): Promise<?User> {
  firebase.initializeApp(firebaseConfig)
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      return resolve(user)
    })
  })
}

export function startAuth () {
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  // FirebaseUI config.
  const el = document.querySelector('.main')
  if (el) {
    el.innerHTML = `
      <div id="firebaseui-auth-container"></div>
    `
  }
  ui.start('#firebaseui-auth-container', firebaseUiConfig)
}
