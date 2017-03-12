/* @flow */
import React from 'react'
import Hello from '../../../components/Hello'
import { getFirebase } from '../../../config/firebase'

export default function Home () {
  return <div>
    Home
    <Hello/>
    <button
      onClick={() => {
        const firebase = getFirebase()
        firebase.auth().signOut()
        setTimeout(() => {
          location.reload()
        }, 1000)
      }}
    >
      logout
    </button>
  </div>
}
