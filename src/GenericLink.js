import React from 'react'
import { PropTypes } from 'prop-types'

import { triggerCustomEvent } from './util'

const LinkGeneric = props => {
  return (
    <a
      key={props.keyP}
      className={props.classes}
      style={props.styles}
      href={props.href}
      target={props.target}
      onClick={() => { triggerCustomEvent(props.cta) }}
      rel={props.rel}
    >
      {props.label}
    </a>
  )
}

LinkGeneric.propTypes = {
  keyP: PropTypes.string,
  classes: PropTypes.string,
  styles: PropTypes.object,
  label: PropTypes.string,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  cta: PropTypes.string
}

LinkGeneric.defaultProps = {
  keyP: 'defaultLink',
  classes: '',
  styles: {},
  label: 'Default Link',
  target: '',
  href: 'javascript:void(0)',
  cta: 'CUSTOM_NO_EVENT',
  rel: ''
}

export default LinkGeneric
