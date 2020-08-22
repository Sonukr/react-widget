This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start:webpack`

Runs the app in the development mode.<br />
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.


### `yarn build:webpack`
Runs the build and create production level js files in build folder and copy the view folder html files. build folder contains the following files - `auto_index.html`, `index.html`, `init_index.html`, `widget.js`, `widget_nonInit.js` .

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



### `How to use`

###### Self Initilaze version - 
Create a index.html file. add `widget.js` as script src.  add `window.WidgetSettingsit` in script tag for custom config of UI. It will create a widget automatically on bottom right.

```JS
<body>
    <script>
     window.WidgetSettings = {
          button_text: 'Contact Us',
          form_title: 'Contact us',
          form_subtitle: 'Leave a message and we will get back to you shortly.',
          form_subject_list: [
            'Where is my order',
            'I want to cancel my order'
          ],
          form_submission_url: '<server url>',
      }
    </script>
    <script src="./widget.js"></script>
</body>
```

###### Manually initialze script - 

```JS
<body>
    <script src="./widget_nonInit.js"></script>
    <script>
      // Custom config
      window.WidgetSettings = {
          button_text: 'Contact Us',
          form_title: 'Contact us',
          form_subtitle: 'Leave a message and we will get back to you shortly.',
          form_subject_list: [
            'Where is my order',
            'I want to cancel my order'
          ],
          form_submission_url: '<server url>',
      }
      // Init the widget
      WidgetInit.mount();
    </script>
</body>

```