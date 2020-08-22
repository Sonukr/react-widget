import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/widget';
import { Render } from './render';

export default class WidgetNonInit {
  static widgetElement;

  static mount({ parentElement = null, ...props } = {}) {
    const component = <Widget {...props} />;
    if (document.readyState === 'complete') {
      Render(WidgetNonInit, parentElement, component)
    } else {
      window.addEventListener('load', () => {
        Render(WidgetNonInit, parentElement, component)
      });
    }
  }

 static unmount() {
    if (!WidgetNonInit.widgetElement) {
      throw new Error('EmbeddableWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(WidgetNonInit.widgetElement);
    WidgetNonInit.widgetElement.parentNode.removeChild(WidgetNonInit.widgetElement);
    WidgetNonInit.widgetElement = null;
  }
}
