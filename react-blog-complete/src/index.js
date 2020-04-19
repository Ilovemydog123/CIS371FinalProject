import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './books.css'
import Books from './components/Books'
import * as serviceWorker from './serviceWorker'

const cors = require('cors');
/* Use CORS. Enable for All requests */
app.use(cors()); 

ReactDOM.render(
  <React.StrictMode>
    <Books />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
