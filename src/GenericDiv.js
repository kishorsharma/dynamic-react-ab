import React, {Component} from 'react'
import { PropTypes } from 'prop-types'

import LinkGeneric from './GenericLink'
import ButtonGeneric from './GenericButton'

const ctaMapper = {
  link: LinkGeneric,
  button: ButtonGeneric
}

export default class DivGeneric extends Component {
  componentDidMount() {
    if (this.props.triggerOnMount) {
      const event = new Event(this.props.triggerOnMount)
      window.dispatchEvent(event)
    }
  }

  componentWillUnmount() {
    if (this.props.triggerOnUnMount) {
      const event = new Event(this.props.triggerOnUnMount)
      window.dispatchEvent(event)
    }
  }

  render () {
    const { props } = this
    if (props.beforeElem) {
      const elm = document.getElementById(props.beforeElem)
      if (elm) {
        elm.style.marginTop = '0px'
        const elmTop = elm.offsetTop
        props.styles.top = `${elmTop + 10}px`
        props.styles.display = `block`
        props.styles.position = 'absolute'
        props.styles.paddingLeft = `${props.divPadLeft}px`
        props.divHeight && (elm.style.marginTop = `${props.divHeight}px`)
        props.divWidth && (elm.style.marginLeft = `${props.divWidth}px`)
      }
    }

    return (
      <div key={props.keyP} className={props.classes} style={props.styles}>
        {props.heading && (
          <p
            className={props.headingClasses}
          >
            {props.heading}
          </p>
        )}
        {props.content && (
          <div
            className={props.contentClasses}
          >
            {props.content}
          </div>
        )}
        {props.contentHtml && (
          <div dangerouslySetInnerHTML={{__html: props.contentHtml}} />
        )}
        {props.ctaList && props.ctaList.map((cta) => {
          const CtaComp = ctaMapper[cta.type]
          return (<CtaComp {...cta} key={cta.keyP} />)
        })}
      </div>
    )
  }
}

DivGeneric.propTypes = {
  keyP: PropTypes.string,
  classes: PropTypes.string,
  styles: PropTypes.object,
  beforeElem: PropTypes.string,
  divHeight: PropTypes.number,
  divWidth: PropTypes.number,
  divPadLeft: PropTypes.number,
  heading: PropTypes.string,
  headingClasses: PropTypes.string,
  content: PropTypes.string,
  contentClasses: PropTypes.string,
  contentHtml: PropTypes.string,
  ctaList: PropTypes.array,
  triggerOnMount: PropTypes.string,
  triggerOnUnMount: PropTypes.string
}

DivGeneric.defaultProps = {
  keyP: 'defaultDiv',
  classes: '',
  headingClasses: '',
  contentClasses: '',
  styles: {bottom: 0, position: 'absolute'},
  heading: null,
  content: null,
  contentHtml: null,
  ctaList: [],
  beforeElem: null,
  divHeight: null,
  divWidth: null,
  divPadLeft: null,
  triggerOnMount: null,
  triggerOnUnMount: null
}
