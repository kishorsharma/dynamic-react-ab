/* eslint-disable no-undef */
/* CUSTOM CODE */
(function() {
  console.log('Google tag manager is working')

  function getUserPreference() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          name: 'Brij',
          email: 'brij@kishor.com'
        })
      }, 1000)
    })
  };
  function formHTML(param) {
    return '<div class="col-md-12"><p >Confirm contact details</p><hr/>' +
      '  <form name="ContactForm" onSubmit="return formSubmitFunc()">' +
      '    <div class="row row-">' +
      '      <div class="col-md-6 form-group"><label htmlFor="name" >Name</label>' +
      '           <input type="text" name="user_name" value="' + param.name + '" placeholder="Full name"' +
      '            class="form-control"></div>' +
      '      <div class="col-md-6 form-field-label"><label htmlFor="email">Email Id</label>' +
      '            <input class="form-control" type="text" name="email" value="' + param.email + '" placeholder="user@gmail.com">' +
    '        </div>' +
      '    </div>' +
      '    <div class="col-md-12 clearfix">' +
      '      <button type="submit" class="btn btn-default pull-left">Confirm Details</button>' +
      '      <button id="close-modal-btn" type="button" class="btn btn-danger pull-left">Close</button>' +
      '    </div>' +
      '  </form>' +
      '</div>'
  };
  var modal = {
    id: 'myrandomID',
    type: 'modal',
    keyP: 'defaultModal',
    classes: 'customGenDiv',
    styles: { display: 'none', position: 'absolute' },
    heading: 'Default Heading',
    openTriggerEvent: 'OPEN_MODAL',
    closeTriggerEvent: 'CLOSE_MODAL',
    triggerOnOpen: 'CONTACT_MODAL_OPEN',
    content: {
      type: 'div',
      key: 'defaultdiv',
      classes: 'customGenDiv',
      styles: {},
      contentHtml: null
    }
  }
  var btn = {
    type: 'button',
    keyP: 'defaultButton1',
    classes: 'btn-filled-sec-large ripple vwo_custom_btn',
    styles: {position: 'absolute', padding: '13px 20px'},
    label: 'Edit Contact Detail',
    cta: 'CUSTOM_BTN_EVENT_1'
  }
  var successMsg = {
    type: 'div',
    keyP: 'successDiv',
    classes: 'custom-edit-contact-success',
    styles: {position: 'fixed', zIndex: 9, width: '100%', top: 0, left: 0},
    contentHtml: '<div class="bg-success"><div class="container">Great! your contact details have successfully been updated.<span class="rosterClose"></span></div></div>'
  }
  function init() {
    getUserPreference()
      .then(function(data) {
        modal.content.contentHtml = formHTML({
          name: data.name,
          email: data.email
        })
        window.dynamincData = {
          triggerOnMount: 'COMP_LOADED',
          comps: [
            modal,
            btn
          ]
        }
        var updateVwoDataEvent = new CustomEvent('REACT_AB_SET_STATE', {
          detail: {
            show: true,
            dynamincData: {
              triggerOnMount: 'COMP_LOADED',
              comps: [
                modal,
                btn
              ]
            }
          }
        })
        window.dispatchEvent(updateVwoDataEvent)
      })
  }
  init()
  window.formSubmitFunc = function () {
    var contactFrom = document.forms['ContactForm']
    console.log('contactForm: ', contactFrom)
    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          name: 'brij',
          email: 'kishor@brij.com'
        })
      }, 1000)
    })
    promise.then(function(resp) {
      closeModal()
      console.log('resp: ', resp)
      modal.content.contentHtml = formHTML({
        name: resp.name,
        email: resp.email
      })
      var updateVwoDataEvent = new CustomEvent('REACT_AB_SET_STATE', {
        detail: {
          show: true,
          dynamincData: {
            triggerOnMount: 'COMP_LOADED',
            comps: [
              modal,
              btn,
              successMsg
            ]
          }
        }
      })
      window.dispatchEvent(updateVwoDataEvent)
      clearMessage()
      console.log('Saves:', resp)
    })
    return false
  }

  window.addEventListener('CONTACT_MODAL_OPEN', function() {
    var modalcCloseBtn = document.getElementById('close-modal-btn')
    function closeEvent() {
      window.dispatchEvent(new Event('CLOSE_MODAL'))
    }
    modalcCloseBtn.removeEventListener('click', closeEvent) // clearing any previous closeEvent
    modalcCloseBtn.addEventListener('click', closeEvent)
  })

  window.addEventListener('CUSTOM_BTN_EVENT_1', function() {
    var openEvent = new Event('OPEN_MODAL')
    window.dispatchEvent(openEvent)
  })
  function throwSegmentEvent() {
    console.log('User can send anlytic data for close event')
  }
  var COMP_LOADED = function () {
    console.log('component loaded')
  }
  window.addEventListener('COMP_LOADED', COMP_LOADED)
  function openModal () {
    var openEvent = new Event('OPEN_MODAL')
    window.dispatchEvent(openEvent)
    document.getElementsByClassName('at_modal_close')[0].onclick = throwSegmentEvent
  };
  function closeModal() {
    var closeEvent = new Event('CLOSE_MODAL')
    window.dispatchEvent(closeEvent)
  }
  function clearMessage() {
    setTimeout(function() {
      var updateVwoDataEvent = new CustomEvent('REACT_AB_SET_STATE', {
        detail: {
          show: true,
          dynamincData: {
            triggerOnMount: 'COMP_LOADED',
            comps: [
              modal,
              btn
            ]
          }
        }
      })
      window.dispatchEvent(updateVwoDataEvent)
    }, 5000)
  }
}())
