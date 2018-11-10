/* eslint-disable no-undef */
import React, { Component } from 'react'

import ReactAB from 'dynamic-react-ab'

export default class App extends Component {
  render () {
    return (
      <div key='appContainer' className='container'>
        <hr />
        <p>This is demo for dynamic generic component</p>
        <hr />
        <ReactAB />
      </div>
    )
  }
}
