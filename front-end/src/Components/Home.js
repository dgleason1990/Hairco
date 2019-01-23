import React, { Component } from 'react';
import LocationModal from './LocationModal';
import {withRouter} from 'react-router-dom';

export default withRouter(class Home extends Component {
    state={
        isOpen: false
    }

    handleOpen = ()=>{
        this.setState({
          isOpen: true
        })
      }

    handleClose = ()=>{
        this.setState({
            isOpen:false
        })
    }

    handleClientLocation = (location) => {
        this.props.clientLocation(location);
        this.props.history.push('/clients');
    }
    
  render() {
    return (
        <div className='home'>
            <div className='summary'>
            <img src='./Assets/badge.jpg'/>
                <div>
                     <h1 className='title'>Welcome to HairCo</h1> 
                </div>
                <h2> Bringing clients and hair stylists together in an easy to use application </h2>
                <button onClick={this.handleOpen}> <img src='./Assets/button.jpg' alt='Button Image'/>BOOK NOW</button>
                <LocationModal isOpen={this.state.isOpen} handleClose={this.handleClose} clientLocation={this.handleClientLocation} />
            </div>
        </div>
    )
  }
})
