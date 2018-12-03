import React, {Component} from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'react-modal'

import DivGeneric from './GenericDiv'
import { triggerCustomEvent } from './util'

export default class ModalGeneric extends Component {
  static propTypes = {
    keyP: PropTypes.string,
    classes: PropTypes.string,
    styles: PropTypes.object,
    closeStyle: PropTypes.object,
    content: PropTypes.object,
    closeModal: PropTypes.bool,
    isOpen: PropTypes.bool,
    openTriggerEvent: PropTypes.string,
    closeTriggerEvent: PropTypes.string,
    triggerOnOpen: PropTypes.string,
    triggerOnClose: PropTypes.string,
    triggerOnMount: PropTypes.string
  };

  static defaultProps= {
    keyP: 'defaultModal',
    classes: '',
    styles: {},
    closeStyle: {
      position: 'absolute',
      right: '-25px',
      width: '24px',
      zIndex: 2,
      paddingLeft: '5px',
      overflow: 'hidden',
      background: '#dc3945',
      color: 'white',
      fontWeight: 700
    },
    content: null,
    isOpen: false,
    openTriggerEvent: null,
    closeTriggerEvent: null,
    triggerOnOpen: null,
    triggerOnClose: null,
    triggerOnMount: null
  };

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.bindOpenTriggerEvent = this.bindOpenTriggerEvent.bind(this)
    this.bindCloseTriggerEvent = this.bindCloseTriggerEvent.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    if (props.openTriggerEvent) {
      this.bindOpenTriggerEvent(props.openTriggerEvent)
    }
    if (props.closeTriggerEvent) {
      this.bindCloseTriggerEvent(props.closeTriggerEvent)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isOpen && nextProps.isOpen) {
      this.openModal()
    }
    if (nextProps.closeModal) {
      this.closeModal()
    }
    if (this.props.triggerOnMount) {
      triggerCustomEvent(this.props.triggerOnMount)
    }
  }

  openModal() {
    this.setState({
      isOpen: true
    })
  }

  closeModal() {
    this.setState({
      isOpen: false
    }, () => {
      if (this.props.triggerOnClose) {
        triggerCustomEvent(this.props.triggerOnClose)
      }
    })
    document.body.style.overflow = ''
  }

  afterOpenModal() {
    if (this.props.triggerOnOpen) {
      triggerCustomEvent(this.props.triggerOnOpen)
    }
    document.body.style.overflow = 'hidden'
  }

  componentDidMount() {
    if (this.props.triggerOnMount) {
      triggerCustomEvent(this.props.triggerOnMount)
    }
  }

  componentWillUnmount() {
    this.closeModal()
  }

  bindOpenTriggerEvent (openTriggerEventName) {
    window.addEventListener(openTriggerEventName, () => {
      this.openModal()
    })
  }

  bindCloseTriggerEvent (closeTriggerEventName) {
    window.addEventListener(closeTriggerEventName, () => {
      this.closeModal()
    })
  }

  render () {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel='Generic Modal'
        ariaHideApp={false}
        style={this.props.styles}
      >
        <div style={this.props.closeStyle} onClick={this.closeModal}>X</div>
        {this.props.content && <DivGeneric {...this.props.content} /> }
      </Modal>
    )
  }
}
