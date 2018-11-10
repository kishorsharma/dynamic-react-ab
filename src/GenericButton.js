import React from 'react'
import { PropTypes } from 'prop-types'

import { triggerCustomEvent } from './util'

const ButtonGeneric = props => {
  return (
    <button
      key={props.keyP}
      className={props.classes}
      style={props.styles}
      type='button'
      onClick={() => { triggerCustomEvent(props.cta) }}
    >
      {props.label}
    </button>
  )
}

ButtonGeneric.propTypes = {
  keyP: PropTypes.string,
  classes: PropTypes.string,
  styles: PropTypes.object,
  label: PropTypes.string,
  cta: PropTypes.string
}

ButtonGeneric.defaultProps = {
  keyP: 'defaultButton',
  classes: '',
  styles: {},
  label: 'Default button',
  cta: 'CUSTOM_NO_EVENT'
}

export default ButtonGeneric
