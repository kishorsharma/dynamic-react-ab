# dynamic-react-ab

> Dynamic react component to ease AB testing via AB test providers like vwo, optimizely etc.

A/B testing, also called split testing, is an experiment where two (or more) variants of a webpage are shown 
to users at random to determining which variant leads more acceptane. After finding better variant is is then released for all users.

A/B testing is extremely important in the world of user acquisition. A good article on this is: https://m.signalvnoise.com/how-we-lost-and-found-millions-by-not-a-b-testing-e70f27dd783e

However, All current solution for AB test for react community requires changes in your codebase. Some of modules are:

* react-ab
* react-ab-test

These are good library, but not provide flexibility to change experiment quickly (say within 15 min or so). 
A dev effort followed by a release is required which in most experiment (as they are fail fast) not required.

### Approach: Dynamic Component

Dynamic component is blank component ready to comsume data on predefined schema. This way a dev can easily create differect 
comoonents and launch them instantly. 

### Why a generic component:

* Most SPA frameworks like Angularjs and Reactjs use bindings to update DOM content. 
  On applying a conflicting change on the page using VWO/Optimizely/google tag manager editor, updates may not reflect on the page.
* You many notice that sometimes the original content of the page displays despite using the hide element option. 
  This happens because most SPA framework render their content component-wise and keep checking for changes.
  
By making changes using generic component, we give control to react to change the UI on page instead of fighting with it. It makes react 
happy and our changes are persistant.



[![NPM](https://img.shields.io/npm/v/dynamic-react-ab.svg)](https://www.npmjs.com/package/dynamic-react-ab) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save dynamic-react-ab
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactAB from 'dynamic-react-ab'

class Example extends Component {
  render () {
    return (
      <ReactAB />
    )
  }
}
```


## Props:

#### Common Props:

These props are available in all generic components:

* keyP: This prop will be used to provide key attribute to your generic component
* classes: Class to be added to your component. It is space seperated string value.
* style: JSON object with style propertise to be applied on component.

#### Generic Button Props:
* label: Label you want to show on your button
* cta: Event name which will be trrigerred when user click on this button. This event will be listened by window object.

ex: 

Let's define our button component:

```javascript
{
  type: 'button',
  keyP: 'defaultButton',
  classes: 'custom_btn_class',
  styles: {padding: '13px 20px'},
  label: 'Generic button',
  cta: 'CUSTOM_BTN_EVENT_1'
}
```

To listen on click we need:

```javascript
window.addEventListener('CUSTOM_BTN_EVENT_1', function() {
  console.log('Generic button is been clicked');
});
```

#### Generic Link Props:
* label: Label you want to show on your Link
* cta: Event name which will be trrigerred when user click on this link. This event will be listened by window object.
* rel: For more information goto: https://www.w3schools.com/TAGS/att_a_rel.asp


ex: 

Let's define our Link component:

```javascript
{
  type: 'link',
  keyP: 'defaultLink',
  classes: 'custom_link_class',
  styles: {padding: '13px 20px'},
  label: 'Generic Link',
  cta: 'CUSTOM_LINK_EVENT_1'
}
```

To listen on click we need:

```javascript
window.addEventListener('CUSTOM_LINK_EVENT_1', function() {
  console.log('Generic Link is been clicked');
});
```

#### Generic Div Props:
* triggerOnMount: An event name to be triggered when this div is mounted.
* heading: A heading section of div
* headingClasses: Space seperated class to be added to heading if present
* content: Plain test to be displayed as inner text of div
* contentClasses: Space seperated class to be added to content if present
* contentHtml: A plain HTML to be rendered inside div. You can add listener on button on triggerOnMount event.
* beforeElem: Element ID before which this div to be placed. default value is null
* divHeight: Used with beforeElem to determine how much we need to lower it to provide proper space for div.
* divWidth: Used with beforeElem to determine how much we need to shift right it to provide proper space for div.
* divPadLeft: Used with beforeElem to determine how much we need to pad it at left align
* triggerOnMount: An event name which is triggered by div component on window object to tell user it is mounted,
* triggerOnUnMount: An event name which is triggered by div compoent on window object to tell user it is unmounted.
* ctaList: This can have multiple Button and Link component as CTAs.


ex: 

Let's define our Div component:

```javascript
const divG = {
    id: 'myrandomID',
    type: 'div',
    keyP: 'defaultDiv',
    classes: 'customGenDiv',
    styles: {},
    triggerOnMount: 'DIV_LOADED',
    heading: 'Default Heading', // optional
    // content: 'asdfasdfasdf', // optional either content or contentHtml should be provided
    contentHtml: '<p>This is a p tag <button id="a_dynamic_btn" class="btn-filled-sec-large ripple customCss">Sample</button></p><span class="spanner">A simple span class</span> ',
    beforeElem: 'detail-container',
    divHeight: 100,
    divWidth: null,
    divPadLeft: 26,
    // This can have multiple Button and Link component as CTAs.
    ctaList: [{
      type: 'button',
      keyP: 'defaultDivButton1',
      classes: 'btn-filled-sec-large ripple',
      styles: {},
      label: 'Open Modal',
      cta: 'CUSTOM_DIV_BTN_EVENT_1'
    }, {
      type: 'button',
      keyP: 'defaultDivButton2',
      classes: 'btn-filled-sec-large ripple',
      styles: {},
      label: 'Trigger Event Btn 2',
      cta: 'CUSTOM_DIV_BTN_EVENT_2'
    }]
  }
```

To listen on click of div cta's we need:

```javascript
window.addEventListener('CUSTOM_DIV_BTN_EVENT_1', function() {
  console.log('Cta button of Generic div is been clicked');
});
```

#### Generic Div Props:
* content: This is Div section to display content inside Modal,
* closeModal: Boolean value to make it close through props (during on mount or prop change),
* isOpen: Boolean value to make it open through props (during on mount or prop change),
* openTriggerEvent: An event name which is triggered by user on window object. This will open modal.,
* closeTriggerEvent: An event name which is triggered by user on window object. This will close modal.,
* triggerOnOpen: An event name which is triggered by modal on window object to tell user modal is now open.,
* triggerOnClose: An event name which is triggered by modal on window object to tell user modal is now close.,
* triggerOnMount: An event name which is triggered by by modal on window object to tell user modal is now mounted.

ex: 

Let's define our Div component:

```javascript
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
    openTriggerEvent: 'CUSTOM_OPEN_MODAL',
    closeTriggerEvent: 'CUSTOM_CLOSE_MODAL',
    triggerOnOpen: 'CUSTOM_MODAL_OPEN',
    triggerOnClose: 'CUSTOM_MODAL_CLOSE',
    triggerOnMount: 'CUSTOM_MODAL_MOUNTED',
    content: {
      type: 'div',
      key: 'defaultdiv',
      classes: 'customGenDiv',
      styles: {},
      contentHtml: '<p>This is a sampe content using HTML <button id="closeModal">Close</button></p>'
    }
  }
```

To listen on open, close or mount of modal of div cta's we need:

```javascript
window.addEventListener('CUSTOM_MODAL_OPEN', function() {
  console.log('Modal opened');
});
window.addEventListener('CUSTOM_MODAL_CLOSE', function() {
  console.log('Modal close');
});window.addEventListener('CUSTOM_MODAL_MOUNTED', function() {
  console.log('Modal mounted');
});
```

You can add dynamic button with CTA same as ```openTriggerEvent``` to open modal:


```javascript
{
  type: 'button',
  keyP: 'defaultButton',
  classes: 'custom_btn_class',
  styles: {padding: '13px 20px'},
  label: 'Generic button',
  cta: 'CUSTOM_OPEN_MODAL'
}
```
After defining your components as above, you need to update state of dynamic-react component:

```javascript
const newState = {
  show: true,
  dynamincData: {
    triggerOnMount: 'TRRIGER_ON_MOUNT',
    comps: [btn, lnk, divG, modalGen]
  }
}

var evt = new CustomEvent('REACT_AB_SET_STATE', {detail: newState})
window.dispatchEvent(evt)
```


## Sample:

You can find example folder in repo. This contain an sample app which is using GTM to dynamically inject edit contact form flow.

To use with AB testing providers:

* Each experiment can be used as a variation.
* We need to place code similar to sample in VWO/Optimizely.
* Then we can assign user traffic to each variation based on our requirment.

Their are plenty good tutorials for creating variation. Please check respective site for same.


With google tag manager:
* As it is always available for 100% user we can simply create a HTML tag.
* Copy code inside script tag and it will be available to all users.

AB Testin need custom logic. I am not aware of AB testing via gtag.

For GTM: 

* Create Workspace and paste gtm code in head section of your HTML file.
* Create a tag in your workspace of type HTML.
* create script block.
* Paste sample code in it.
* You can check it in preview mode and then publish it.

GTM is easy to try as it can be used with localhost.

## TODO's:

* Allowing multiple experiment run simultaneosly.
* With react modal lib size goes to 60 KB however without it we have 13 Kb. Need to find alternative to reduce size.
* Test cases.

## Contribution:
Contribution are welcomed. Please raise a PR.

## Ownership:
Code belongs to TravelTriangle Pvt. Ltd.

## License

MIT © [kishorsharma](https://github.com/kishorsharma)

