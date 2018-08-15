require('../css/index.css')

import React from 'react'
import ReactDOM from 'react-dom'

const Index = () => {
  return <div>Hello Pauline!</div>
}

ReactDOM.render(<Index />, document.getElementById('index'))

// Necessary for hot module reloading.
if (module.hot) module.hot.accept()
