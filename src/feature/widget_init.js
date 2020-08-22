import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../components/widget';
import { Render } from './render';

class WidgetInit {
  static widgetElement;

  mount({ parentElement = null, ...props } = {}) {
    const component = <Widget {...props} />;
    if (document.readyState === 'complete') {
      Render(WidgetInit, parentElement, component)
    } else {
      window.addEventListener('load', () => {
        Render(WidgetInit, parentElement, component)
      });
    }
  }

 unmount() {
    if (!WidgetInit.widgetElement) {
      throw new Error('EmbeddableWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(WidgetInit.widgetElement);
    WidgetInit.widgetElement.parentNode.removeChild(WidgetInit.widgetElement);
    WidgetInit.widgetElement = null;
  }
}

const d = new WidgetInit();
export default d.mount();