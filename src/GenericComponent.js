import React, {Component} from 'react'

import ModalGeneric from './GenericModal'
import LinkGeneric from './GenericLink'
import ButtonGeneric from './GenericButton'
import DivGeneric from './GenericDiv'

const typeCompMapper = {
  button: ButtonGeneric,
  link: LinkGeneric,
  div: DivGeneric,
  modal: ModalGeneric
}

export default class GenericComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layoutKey: 'default',
      show: false,
      dynamincData: null
    }
    if (typeof window !== 'undefined') {
      this.updateLayout('constructor')
    }
    this.updateStateByVWO = this.updateStateByVWO.bind(this)
  }

  componentDidMount() {
    window.addEventListener('REACT_AB_SET_STATE', this.updateStateByVWO)
    if (this.state.dynamincData && this.state.dynamincData.triggerOnMount) {
      const event = new Event(this.state.dynamincData.triggerOnMount)
      window.dispatchEvent(event)
    }
  }

  componentWillUnmount() {
    console.debug('Unmounting generic component')
    window.removeEventListener('REACT_AB_SET_STATE', this.updateStateByVWO)
  }

  componentWillReceiveProps() {
    if (typeof window !== 'undefined') {
      this.updateLayout('componentWillReceiveProps')
    }
  }

  componentDidUpdate() {
    if (this.state.dynamincData && this.state.dynamincData.triggerOnMount) {
      const event = new Event(this.state.dynamincData.triggerOnMount)
      window.dispatchEvent(event)
    }
  }

  updateStateByVWO(event) {
    console.debug('State changes: ', event)
    event.detail && this.setState(event.detail)
  }

  updateLayout(method) {
    if (window.dynamincData) {
      this.setState({
        layoutKey: `Custom_Layout`,
        show: true,
        dynamincData: window.dynamincData
      }, () => {
        window.dynamincData = null
      })
    }
  }

  render () {
    if (this.state.show) {
      const overriderObj = {
        ...this.state.dynamincData
      }
      return (
        <div key='genericComponent'>
          {overriderObj.comps && overriderObj.comps.map((comp) => {
            const Component = typeCompMapper[comp.type]
            if (!Component) return // To avoid app crash if unknown type is passed
            return <Component {...comp} key={`${comp.keyP}-parent`} />
          })}
        </div>
      )
    }
    return null
  }
}
