# dynamic-react-ab

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

> Dynamic react component to ease AB testing via AB test providers like VWO, Optimizely etc.

A/B testing also known as split testing, is an experiment where two (or more) variants of a webpage are shown to users at random to determine which variant leads to more acceptance. After finding a better variant, it is then released for all users.

A/B testing is extremely important in the world of user acquisition. A good article on this is: https://m.signalvnoise.com/how-we-lost-and-found-millions-by-not-a-b-testing-e70f27dd783e

However, the current solutions for A/B test in the react community require changes in your codebase. Some of the modules are:

* react-ab
* react-ab-test

These are the good libraries, but do not provide flexibility to change the experiment quickly (say within 15 min or so).
A dev effort followed by a release is required for most of the experiments which should not be needed as most of them are usually fail fast experiments.

### Approach: Dynamic Component

Dynamic component is a blank component ready to consume data on a predefined schema. This way a dev can easily create different components and launch them instantly.

### Why a *generic* component:

* Most SPA frameworks like Angular.js and React.js (It is not a framework) use bindings to update DOM content. On applying a conflicting change on the page using VWO/Optimizely/GTM editor (Google Tag Manager), updates may not reflect on the page.
* You may notice that sometimes the original content of the page is displayed despite using the hide element option. This happens because most SPA frameworks/libraries render their content component-wise and keep checking for changes in the Virtual or Shadow DOM.

By making changes using a *generic* component, we give control to react to change the UI on the page instead of fighting with it. It makes React happy and our changes are persisted!

## Props:

#### Common Props:

These props are available in all generic components:

* keyP: This prop will be used to provide **key** attribute to your generic component
* classes: Class to be added to your component. It is a space-delimited string value.
* style: JSON object with style properties to be applied on the component.

#### Generic Button Props:
* label: Label you want to show on your button.
* cta: Event name which will be triggered when the user clicks on this button. This event will be listened by the **window** object.

E.g.,:

Let's define our button component:

```javascript
{
  type: 'button',
  keyP: 'defaultButton',
  classes: 'custom_btn_class',
  styles: { padding: '13px 20px' },
  label: 'Generic button',
  cta: 'CUSTOM_BTN_EVENT_1'
}
```

To listen on click we need:

```javascript
window.addEventListener('CUSTOM_BTN_EVENT_1', function() {
  console.log('Generic Button is Clicked');
});
```

#### Generic Link Props:
* label: A Label you want to show on your Link.
* cta: Event name which will be triggered when the user clicks on this link. This event will be listened by the **window** object.
* rel: For more information please visit https://www.w3schools.com/TAGS/att_a_rel.asp.


E.g.,:

Let's define our Link component:

```javascript
{
  type: 'link',
  keyP: 'defaultLink',
  classes: 'custom_link_class',
  styles: { padding: '13px 20px' },
  label: 'Generic Link',
  cta: 'CUSTOM_LINK_EVENT_1'
}
```

To listen on click we need:

```javascript
window.addEventListener('CUSTOM_LINK_EVENT_1', function() {
  console.log('Generic Link is Clicked');
});
```

#### Generic Div Props:
* triggerOnMount: An event name to be triggered when this **div** is mounted.
* heading: A heading section of the **div**.
* headingClasses: Space-delimited class to be added to heading if present.
* content: Plain text to be displayed as inner text of the **div**.
* contentClasses: Space-delimited class to be added to content if present.
* contentHtml: A plain HTML to be rendered inside the **div**. You can add listener on button on triggerOnMount event.
* beforeElem: Element ID before which this div to be placed. The default is **null**.
* divHeight: Used with **beforeElem** to determine how much we need to lower it to provide proper space for the **div**.
* divWidth: Used with **beforeElem** to determine how much we need to shift it right to provide proper space for the **div**.
* divPadLeft: Used with **beforeElem** to determine how much we need to pad it at left align.
* triggerOnMount: An event name which is triggered by the **div** component on the **window** object to tell the user it is mounted.
* triggerOnUnMount: An event name which is triggered by the **div** component on the **window** object to tell the user it is unmounted.
* ctaList: This can have multiple Button and Link component as CTAs.


E.g.,:

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
    // content: 'some dummy content', // optional either content or contentHtml should be provided
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

To listen on click of the **div** cta's we need:

```javascript
window.addEventListener('CUSTOM_DIV_BTN_EVENT_1', function() {
  console.log('CTA Button of the Generic div is Clicked');
});
```

#### Generic Div Props:
* content: This is a Div section to display content inside Modal.
* closeModal: Boolean value to make it close through props (during on mount or prop change).
* isOpen: Boolean value to make it open through props (during on mount or prop change).
* openTriggerEvent: An event name which is triggered by the user on the **window** object. This will open the modal.
* closeTriggerEvent: An event name which is triggered by the user on the **window** object. This will close the modal.
* triggerOnOpen: An event name which is triggered by the modal on the **window** object to tell the user the modal is now opened.
* triggerOnClose: An event name which is triggered by the modal on the **window** object to tell the user the modal is now closed.
* triggerOnMount: An event name which is triggered by the modal on the **window** object to tell the user the modal is now mounted.

E.g.,:

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

To listen on **open**, **close** or **mount** events of the modal of div CTAs we need:

```javascript
window.addEventListener('CUSTOM_MODAL_OPEN', function() {
  console.log('Modal Opened');
});
window.addEventListener('CUSTOM_MODAL_CLOSE', function() {
  console.log('Modal Closed');
});window.addEventListener('CUSTOM_MODAL_MOUNTED', function() {
  console.log('Modal Mounted');
});
```

You can add a dynamic button with CTA same as ```openTriggerEvent``` to open the modal:


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

After defining your components as above, you need to update the state of the dynamic-react component:

```javascript
const newState = {
  show: true,
  dynamincData: {
    triggerOnMount: 'TRRIGER_ON_MOUNT',
    comps: [btn, lnk, divG, modalGen]
  }
}

var evt = new CustomEvent('REACT_AB_SET_STATE', { detail: newState })
window.dispatchEvent(evt)
```


## Sample:

You can find an example folder in the repo. This contains a sample app which is using GTM to dynamically inject edit contact form flow.

To use with AB testing providers:

* Each experiment can be used as a variation.
* We need to place the code similar to sample in VWO/Optimizely.
* Then we can assign user traffic to each variation based on our requirements.

There are plenty of good tutorials for creating variations. Please check the respective site for it.


With Google Tag Manager:
* As it is always available for 100% user we can simply create an HTML tag.
* Copy the code inside the script tag and it will be available to all users.

A/B Testing needs custom logic. I am not aware of AB testing via gtag.

For GTM:

* Create a Workspace and paste the GTM code in the head section of your HTML file.
* Create a tag in your workspace of type HTML.
* create a script block.
* Paste sample code in it.
* You can check it in preview mode and then publish it.

GTM is easy to try as it can be used with **localhost**.

## TODO's:

[] Allowing multiple experiments to run simultaneously.
[] With react modal lib size goes to 60 KB however without it we have 13 Kb. Needs to find an alternative to reduce the size.
[] Test cases.

## Contribution:
Contributions are welcome. Please raise the PR.

## Ownership:
The Code belongs to [TravelTriangle Pvt. Ltd](https://traveltriangle.com).

## License

MIT © [kishorsharma](https://github.com/kishorsharma)

