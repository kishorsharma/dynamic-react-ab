import React, {Component} from 'react';

import GenericComponent from './GenericComponent';
import { unique } from './util'

export default class DynamicReactAB extends Component {

  constructor() {
    super()
    const initArr = (typeof window !== 'undefined' && window.dynamicReactDataLayer) ? window.dynamicReactDataLayer : []
    this.state = {
      experiments: unique(initArr)
    }
  }

  componentDidMount() {
    window.dynamicReactDataLayer = window.dynamicReactDataLayer || []
    const that = this
    window.dynamicReactDataLayer.push = function (experiment) {
      that.setState({
        experiments: unique([...window.dynamicReactDataLayer, experiment])
      })
      return Array.prototype.push.apply(this, arguments)
    }
    function initFunc() {
      window.dynamicReactABInit = true
    }
    window.removeEventListener('DYNAMIC_REACT_AB_MOUNTED', initFunc)
    window.addEventListener('DYNAMIC_REACT_AB_MOUNTED', initFunc)
    window.dispatchEvent(new Event('DYNAMIC_REACT_AB_MOUNTED'))
  }

  render () {
    const experiments = this.state.experiments;
    console.log('experiments: ', experiments.length);
    return (
      <div>
        {
          experiments.map(Experiment => <GenericComponent key={Experiment} stateUpdateEvent={Experiment} />)
        }
      </div>
    )
  }
};
