import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

class Modal extends Component {
    state={
        submission:{
            stylistId: '',
            name: '',
            date: '',
            comment: '',
            client: '',
            phoneNumber: ''
          }
    }

    onSubmission = async (e) => {
        e.preventDefault();
        await this.setState({
            submission:{
                ...this.state.submission,
                stylistId: this.props.stylistData.id,
                name: this.props.stylistData.name
            }
        });
        let submissionData = this.state.submission
        let init={
          method: 'POST',
          body: JSON.stringify(submissionData),
          headers: {"content-type": "application/json"}
        }
        fetch('http://localhost:8080/appointment', init)
        .then( alert('Appointment Sent! Expect a text or call'))
        .catch(err=>console.log(err))
      }
      onChange = (date) => {
        this.setState({
          submission:{
            ...this.state.submission,
            date: date
          }
        })
      }
    
      handleChange = (e)=>{
        this.setState({
          submission:{
            ...this.state.submission,
            comment: e.target.value
          } 
        })
      }    

      handleClient = (e)=>{
          this.setState({
              submission:{
              ...this.state.submission,
              client: e.target.value
            }
          })
      }

      handlePhone = (e)=>{
          this.setState({
              submission:{
            ...this.state.submission,
            phoneNumber: e.target.value}
          })
      }

    render(){
        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                <button style={close} onClick={this.props.handleClose}>X Close</button>
                    <h1> {this.state.submission.name} </h1>
                    <form className="submissionForm">
                    <label>
                    Date
                        <Calendar
                        onChange={this.onChange}
                        value={this.props.stylistData.date}
                        />
                    </label>
                    Submit your request:
                    <textarea value={this.state.submission.comment} onChange={this.handleChange}></textarea>
                    Name:
                    <input value={this.state.submission.client} onChange={this.handleClient}></input>
                    Phone Number:
                    <input className='phoneNumber' value={this.state.submission.phoneNumber} onChange={this.handlePhone}></input>
                    <button onClick={this.onSubmission} style={button}> Submit </button>
                    </form>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default Modal;

const flex = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(57,57,57,0.6)',
};

const modalLayer = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    backgroundColor: 'transparent'
  };
  
  const formModal = {
    position: 'absolute',
    color: 'rgb(57,57,57)',
    backgroundColor: '#FFFFFF',
    width: '600px',
    maxWidth: '100%',
    height: '600px',
    maxHeight: '100%',
    zIndex: 2,
    borderRadius: '3px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };

const button = {
    fontSize: '1rem',
    border: 'none',
    color:'rgb(238, 211, 142)',
    backgroundColor:'rgb(21, 21, 21)',
    cursor: 'pointer'
}

const close = {
    border: 'none',
    fontSize: '1.3rem',
    background: 'none',
    width: '300px',
    cursor: 'pointer'
}