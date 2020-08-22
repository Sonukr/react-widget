import ReactDOM from 'react-dom';

export const  Render = (WidgetInit, parentElement, component)  =>{
  if (WidgetInit.widgetElement) {
    throw new Error('sWidget is already mounted, unmount first');
  }
  const widgetElement = document.createElement('div');
  widgetElement.setAttribute('class', 'sWidget');

  if (parentElement) {
    document.querySelector(parentElement).appendChild(widgetElement);
  } else {
    document.body.appendChild(widgetElement);
  }
  ReactDOM.render(component, widgetElement);
  WidgetInit.widgetElement = widgetElement;
}