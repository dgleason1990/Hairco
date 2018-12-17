import React, { Component } from 'react'

export default class Login extends Component {
    constructor(){
        super();
        this.usernameRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    state={
        username: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState ({
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value
        });
        let init = {
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
              "content-type": "application/json"
            }
          }
        fetch('http://localhost:8080/login', init)
        .then(res => {console.log(res);
            localStorage.setItem('token', res)})
    }

  render() {
    return (
      <div className='login'>
        <form>
            <label>
                Username:
                <input ref={this.usernameRef}/>
            </label>
            <label>
                Password:
                <input ref={this.passwordRef} type='password'/>
            </label>
            <button onClick={ this.handleSubmit }>Login</button>
        </form>
      </div>
    )
  }
}
