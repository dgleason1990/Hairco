import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Modal from './Modal';

class yourStylist extends Component {
  state={
    currentStylist: {},
    isOpen: false,
    stylistData: {
      id:'',
      name: ''
    }
  };

  handleOpen = ()=>{
    this.setState({
      isOpen:true
    })
  }

  handleClose = ()=>{
    this.setState({
      isOpen: false
    })
  }

  async componentDidMount(){
    let found = this.props.stylists.findIndex((data)=>{
      return data._id == this.props.match.params.id 
    })
    await this.setState({
      currentStylist: this.props.stylists[found],
      stylistData: {
        id: this.props.stylists[found]._id,
        name: this.props.stylists[found].name
      }
    })
    console.log(this.state)
  }

  componentWillUnmount(){
    this.setState({
      currentStylist: ''
    })
  }

  render() {  
    return (
      <div className='yourStylist'>
        <div className='name'>
          {this.state.currentStylist.name}
        </div>
        <img src={this.state.currentStylist.img}/>
        <button className='button' onClick={this.handleOpen}> <img className='img' src='./Assets/button.jpg' alt='Button Image'/> Book an appointment</button>
        <Modal handleClose={this.handleClose} isOpen={this.state.isOpen} stylistData={this.state.stylistData}/>
      </div>
    )
  }
}

export default withRouter(yourStylist)