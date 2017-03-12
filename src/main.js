/* eslint "flowtype/require-valid-file-annotation": 0 */
import 'babel-polyfill'
import './styles/init.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import { getLoginUser, startAuth } from './config/firebase'

const root = document.querySelector('.main');

(async () => {
  const user = await getLoginUser()

  if (user) {
    ReactDOM.render(<Root/>, root)
  } else {
    startAuth()
  }
})()
