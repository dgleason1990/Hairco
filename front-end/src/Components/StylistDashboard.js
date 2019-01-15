import React, { Component } from 'react';


export default class StylistDashboard extends Component {
    state={
        loading: true,
        auth: false,
        data: ''
    }

   componentDidMount(){
        if(localStorage.token !== undefined && localStorage.token !== null){
            //Add token to request header
            fetch('http://localhost:8080/dashboard',{headers:{'authorization':localStorage.token}})
            .then((res) => { 
                if(res.status === 200){
                    this.setState({
                        loading:false,
                        auth:true
                    })}
                res.json()
                .then(async data=>{ await this.setState({
                    data:data
                    })
                    console.log(this.state)
                })
            })
            .catch((err) => {
                //send user back to login page if token is invalid
                window.location.href = 'http://localhost:3000/login';
            })
        }
        else{
            window.location.href = 'http://localhost:3000/login';
        }
      }

  render() {
    return (
      <div className='dashboard'>
        <h1> Welcome to your dashboard {this.state.data.name} </h1>
        <img src={this.state.data.img} alt='Profile Picture'/>
        <h2> Your current rating is: {this.state.data.rating} </h2>
      </div>
    )
  }
}
