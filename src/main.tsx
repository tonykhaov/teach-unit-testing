import * as React from 'react'
import ReactDOM from 'react-dom'
import AppProviders from '@src/context/app-providers'

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <div />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
