import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocationModal from './LocationModal';
import {withRouter} from 'react-router-dom';

export default withRouter(class Nav extends Component{
    state={
      isOpen: false,
      className: 'container'
    }
    
    handleOpen = (e)=>{
      e.stopPropagation();
      this.setState({
        isOpen: true
      })
    }

    handleClose = ()=>{
      this.setState({
          isOpen:false
      })
    }

    myFunction = () => { 
      if (this.state.className == 'container'){
      this.setState({
        isOpen: false,
        className:'change'
    })} else {
      this.setState({
        isOpen: false,
        className: 'container'
      })
    }
  }

  handleClientLocation = (e, location) => {
    this.props.clientLocation(e, location);
    this.props.history.push('/clients');
    this.setState({
      isOpen:false,
      className: 'container'
    })
}

  render() {
    return (
        <div className='navbar'>
          <Link to='/home' style={home}> HairCo </Link>
          <LocationModal handleClose={this.handleClose} isOpen={this.state.isOpen} clientLocation={this.handleClientLocation} />
          <div className={this.state.className} onClick={this.myFunction}>
            <div onClick={this.myFunction} className="bar1"></div>
            <div className="bar2" onClick={this.myFunction}></div>
            <div className="bar3" onClick={this.myFunction}></div>
            <div className='bar4'>
                <Link to='/home' onClick={this.myFunction} > Home </Link>
                <button onClick={this.handleOpen}>Find your Stylist</button>
                <Link to='/registration' onClick={this.myFunction} > Become a Hairco Stylist </Link>
                <Link to='/login' onClick={this.myFunction} > Login </Link>
            </div>
          </div>
      </div>
    )
  }
})

const home = {
  color: 'rgb(238, 211, 142)',
  textDecoration: 'none'
}