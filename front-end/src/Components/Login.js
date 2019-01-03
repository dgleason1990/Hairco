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
        console.log(this.state)
        let init = {
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
              "content-type": "application/json"
            }
          }
        fetch('http://localhost:8080/login', init)
        .then(res => res.json())
        .then((data)=> {
            this.setState ({
                id: data.id
            });
            localStorage.setItem('token', data.token); 
            this.props.history.push(`/dashboard/${this.state.id}`)}
        )}
        // .catch ((err)=> console.loge(err))}
        // .then(data => {
        //     if (data.status == 200){
        //         localStorage.setItem('token', data.token)
        //     }
        // })

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
