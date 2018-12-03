import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
    this.updateStateByVWO = this.updateStateByVWO.bind(this)
  }

  static propTypes = {
    stateUpdateEvent: PropTypes.string
  }

  componentDidMount() {
    window.addEventListener(this.props.stateUpdateEvent, this.updateStateByVWO)
    if (this.state.dynamincData && this.state.dynamincData.triggerOnMount) {
      const event = new Event(this.state.dynamincData.triggerOnMount)
      window.dispatchEvent(event)
    }
  }

  componentWillUnmount() {
    window.removeEventListener(this.props.stateUpdateEvent, this.updateStateByVWO)
  }

  componentDidUpdate() {
    if (this.state.dynamincData && this.state.dynamincData.triggerOnMount) {
      const event = new Event(this.state.dynamincData.triggerOnMount)
      window.dispatchEvent(event)
    }
  }

  updateStateByVWO(event) {
    event.detail && this.setState(event.detail)
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
