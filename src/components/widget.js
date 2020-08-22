import React, { Component } from 'react';
import './widget.scss';

class Widget extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpened: false,
      formData: {},
      WidgetSettings: {},
      formSubmitted: false
    }
  }
  
  componentDidMount () {
    const { WidgetSettings } = window;
    if(WidgetSettings) {
      this.setState({
        WidgetSettings: WidgetSettings
      })
    }
  }

  handleToggleOpen = () => {
    if(this.state.formSubmitted) {
      this.setState({
        isOpened: !this.state.isOpened,
        formSubmitted: false
      });  
    }
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  renderTrigger = () => {
    return (
      <div 
        className="doc-wrapper" 
        onClick={this.handleToggleOpen}
        onKeyPress={this.handleToggleOpen}
      >
        <p>Contact Us</p>
        <button className="doc-button" >
          <span>✉</span>
        </button>
      </div>
    );
  }

  handleSubmit =(e) =>{
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      subject: e.target.subject.value
    }
    console.log(formData)
    this.setState({
      formSubmitted: true
    })
  }

  handleBack = () =>{
    this.setState({
      formSubmitted:  !this.state.formSubmitted
    })
  }


  getHeader = () => {
    const { formSubmitted, WidgetSettings } = this.state;
    const {form_title, form_subtitle}  = WidgetSettings;
    return (
      <div className="widget-header">
        
        {!formSubmitted ? 
          <>
            <div>
              <h4 className="widget-header-title">
                {form_title || 'Contact Us'}
              </h4>
              <p className="widget-header-subtitle">
                {form_subtitle || 'Leave your message and we will get back to you shortly.'}
              </p>
            </div>
            <button
              type="button"
              className="widget-header-icon"
              onClick={this.handleToggleOpen}
              onKeyPress={this.handleToggleOpen}
            >
              X
            </button>
          </> : <button
              type="button"
              className="widget-header-icon"
              onClick={this.handleToggleOpen}
              onKeyPress={this.handleToggleOpen}
            >
              X
            </button>
        }
      </div>
    )
  }

  getBody = () =>{
    const {formSubmitted, WidgetSettings } = this.state;
    const {button_text} = WidgetSettings;

    return(
      <div className="widget-body">
        {!formSubmitted &&
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="email" placeholder="E-mail"/>
            <select name="subject" id="subject">
              <option value="">Select an option</option>
              {this.getOptions()}
            </select>
            <textarea row="7"name="message" placeholder="Write your email here.">
              </textarea>
            <input type="submit" name="" value={button_text || 'Send Message'} />
          </form>
        }
        {
          formSubmitted &&
          <div className="formSubmit">
            <p>Thank you. We will get back to you shortly.</p>
            <button className="backButton" onClick={this.handleBack}>Okay</button>  
          </div>
        }
      </div>
    )
  }

  getFooter = () => {
    return(
      <div className="widget-footer">
          <p>Powerd by <a href="#" target="_blank">SupportBear</a></p>
      </div>
    )
  }

  getOptions = () => {
    const {WidgetSettings } = this.state;
    const {form_subject_list } = WidgetSettings;    
    if(form_subject_list !== undefined){
      return(
        <>
          {
            WidgetSettings && form_subject_list.map((item, i) => (
              <option value={item} key={i}>{item}</option>
            ))
          }
        </>
      )
    }
    return '';
  }
  
  render() {
    const { isOpened } = this.state;
    return (
      <div className="docked-widget">
        {isOpened &&
          <div className='widget'>
            {this.getHeader()}
            {this.getBody()}
            {this.getFooter()}
          </div> 
        }
        {this.renderTrigger()}
        
      </div>
    );
  }
}

export default Widget;
