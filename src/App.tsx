import React from 'react'
import { Provider } from 'react-redux'
import './index.css'
import store from './store'

import Route from './containers/Route'
import { AuthProvider } from './auth'

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Route />
      </Provider>
    </AuthProvider>
  )
}
