import React, { Component } from 'react';

export default class Stylists extends Component {
  state={
    name:'',
    location:'',
    img: '',
    phoneNumber: '',
    rating: '5'
  }

  handleName = (e)=>{
    this.setState({
      name: e.target.value
    });
  }
  
  handleLocation = (e)=>{
    this.setState({
      location: e.target.value
    });
  }

  handleImg = (e)=>{
    this.setState({
      img: e.target.value
    });
  }

  handlePhoneNumber= (e)=>{
    this.setState({
      phoneNumber: e.target.value
    });
  }

  register = (e)=>{
    e.preventDefault();
    console.log(this.state);
    let name = this.state.name;
    let location = this.state.location;
    let img = this.state.img;
    let init ={
      method:'POST',
      body:JSON.stringify(this.state),
      headers: {
        "content-type": "application/json"
      }
    }
    fetch('http://localhost:8080/registration', init)
      .then((res)=>res.json())
      .catch(err=>console.log(err))
    alert('Registered!')
  }

  render() {
    return (
      <div className='stylistPage'>
        <form>
        <h1> GET REGISTERED </h1>
          <label> 
            Name: 
            <input name={this.state.name} onChange={this.handleName}></input>
          </label>
          <label>
            Location:
            <input name={this.state.location} onChange={this.handleLocation}></input>
          </label>
          <label>
            Phone Number:
            <input name={this.state.phoneNumber} onChange={this.handlePhoneNumber}></input>
          </label>
          <label>
            Profile Picture (URL):
            <input name={this.state.img} onChange={this.handleImg}></input> 
          </label>
          <input name='imageUpload' type="file" accept="image/*" onChange={this.imageAddedHandler}/>
          <button onClick={this.register}> <img src='./Assets/button.jpg' alt='Button Image'/> Register </button>
        </form>
        <video  className='video'autoPlay loop muted src='./Assets/video.mp4' width="900" height="500" >
        </video>
      </div>
    )
  }
}
