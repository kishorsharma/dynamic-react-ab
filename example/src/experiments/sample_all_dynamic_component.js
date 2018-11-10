/* eslint-disable no-undef */
/* CUSTOM CODE */
(function(){
  console.log('Component mounted')
  const btn = {
    'keyP': 'MY_DIV',
    'type': 'button',
    'label': 'Generic button',
    'classes': 'btn-filled-sec-large ripple customCss',
    'styles': {padding: '13px 20px'},
    'cta': 'MY_CUSTOM_BUTTON_EVENT'
  }
  const lnk = {
    'keyP': 'MY_lnk',
    'type': 'link',
    'label': 'Generic Link',
    'classes': 'btn-filled-sec-large ripple customCss',
    'styles': { padding: '13px 20px' },
    'cta': 'MY_CUSTOM_LINK_EVENT'
  }
  const divG = {
    id: 'myrandomID',
    type: 'div',
    keyP: 'defaultDiv',
    classes: 'customGenDiv',
    styles: {},
    triggerOnMount: 'DIV_LOADED',
    heading: 'Default Heading',
    // content: 'asdfasdfasdf',
    contentHtml: '<p>This is a p tag <button id="a_dynamic_btn" class="btn-filled-sec-large ripple customCss">Sample</button></p><span class="spanner">A simple span class</span> ',
    beforeElem: 'detail-container',
    divHeight: 100,
    divWidth: null,
    divPadLeft: 26,
    ctaList: [{
      type: 'button',
      keyP: 'defaultDivButton1',
      classes: 'btn-filled-sec-large ripple',
      styles: {},
      label: 'Open Modal',
      cta: 'CUSTOM_BTN_EVENT_1'
    }, {
      type: 'button',
      keyP: 'defaultDivButton2',
      classes: 'btn-filled-sec-large ripple',
      styles: {},
      label: 'Trigger Event Btn 2',
      cta: 'CUSTOM_BTN_EVENT_2'
    }]
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const modalGen = {
    id: 'myrandomID',
    type: 'modal',
    keyP: 'defaultModal',
    classes: 'customGenModal',
    styles: customStyles,
    openTriggerEvent: 'CUSTOM_BTN_EVENT_1',
    closeTriggerEvent: 'CLOSE_MODAL',
    triggerOnOpen: 'MODAL_OPEN',
    triggerOnMount: 'MODAL_MOUNTED',
    content: {
      type: 'div',
      key: 'defaultdiv',
      classes: 'customGenDiv',
      styles: {},
      contentHtml: '<p>This is a sampe content using HTML <button id="closeModal">Close</button></p>'
    }
  }
  window.addEventListener('MODAL_OPEN', () => {
    const modalcCloseBtn = document.getElementById('closeModal')
    modalcCloseBtn.addEventListener('click', () => {
      window.dispatchEvent(new Event('CLOSE_MODAL'))
    })
  })

  window.addEventListener('DIV_LOADED', () => {
    const divSampleBtn = document.getElementById('a_dynamic_btn')
    divSampleBtn.addEventListener('click', () => {
      console.log('Sample btn is clicked')
    })
  })
  window.addEventListener('CUSTOM_BTN_EVENT_2', () => {
    console.log('CUSTOM_BTN_EVENT_2 event is triggered')
  })

  window.addEventListener('MY_CUSTOM_LINK_EVENT', () => {
    console.log('MY_CUSTOM_LINK_EVENT event is triggered')
  })

  window.addEventListener('MY_CUSTOM_BUTTON_EVENT', () => {
    console.log('MY_CUSTOM_BUTTON_EVENT event is triggered')
  })
  console.log(divG, lnk)
  if (typeof window !== 'undefined') {
    window.dynamincData = {
      comps: [btn, lnk, divG, modalGen]
    }
    const newState = {
      show: true,
      dynamincData: {
        triggerOnMount: 'TRRIGER_ON_MOUNT',
        comps: [btn, lnk, divG, modalGen]
      }
    }
    console.log('Updating new state: ', newState)
    window.addEventListener('REACT_AB_SET_STATE', () => {
      console.log('I have recieved: REACT_AB_SET_STATE')
    })
    var evt = new CustomEvent('REACT_AB_SET_STATE', {detail: newState})
    window.dispatchEvent(evt)
  }
}());
