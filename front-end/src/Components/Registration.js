import React, { Component } from 'react'

export default class Registration extends Component {
  constructor(){
    super();
    this.emailRef = React.createRef()
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
    this.nameRef = React.createRef()
    this.addressRef = React.createRef()
    this.phoneNumberRef = React.createRef()
    this.profileRef = React.createRef()
}

  state = {
    email: '',
    username: '',
    password: '',
    name: '',
    address: '',
    phoneNumber: '',
    profile: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      email: this.emailRef.current.value,
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
      name: this.nameRef.current.value,
      address: this.addressRef.current.value,
      phoneNumber: this.phoneNumberRef.current.value,
      profile: this.profileRef.current.value
    });
    let init = {
      method:'POST',
      body:JSON.stringify(this.state),
      headers:{
        "content-type": "application/json"
      }
    }
    fetch('http://localhost:8080/registration', init)
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='registration'>
         <form>
         <label>
            Email:
            <input ref={this.emailRef} type='email'/>
          </label>
          <label>
            Username:
            <input ref={this.usernameRef}/>
          </label>
          <label>
            Password:
            <input ref={this.passwordRef} type='password'/>
          </label>
          <label>
            Name:
            <input ref={this.nameRef}/>
          </label>
          <label>
            Address:
            <input ref={this.addressRef} />
          </label>
          <label>
            Phone Number:
            <input ref={this.phoneNumberRef}/>
          </label>
          <label>
            Profile Picture (URL)
            <input ref={this.profileRef}/>
          </label>
          <button type='submit' onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}