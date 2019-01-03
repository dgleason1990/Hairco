import React, { Component } from 'react';
import axios from 'axios';

export default class StylistDashboard extends Component {

    // need to fix the problem of anyone guessing the ID to gain access to page ? Token is likely the solution
    state={
        loading: true,
        auth: false,
        data: []
    }

    async componentDidMount(){
       await this.setState({
            id: this.props.params.match.id
        })
        let init = {
            method: 'GET',
            body: JSON.stringify(this.state.id),
            headers:{
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              }
        }
        fetch('http:/localhost:8080/dashboard', init)
        .then(res => res.json())
        .then(data => 
            this.setState({
            img: data.img,
            name: data.name,
            rating: data.rating
        })
        )
        console.log(this.state)
    }

    componentDidMount(){
        if(localStorage.authToken !== undefined && localStorage.authToken !== null){
            //Add token to request header
            axios.get('http://localhost:8080/dashboard',{headers:{'authorization':localStorage.authToken}})
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    this.setState({
                        loading:false,
                        auth:true,
                        data:res.data
                    });
            }})
            .catch((err) => {
                //send user back to login page if token is invalid
                location.href = 'http://localhost:8080/login';
            })
        }
        else{
            location.href = 'http://localhost:8080/loigin';
        }
      }

  render() {
    return (
      <div className='dashboard'>
        <img src={this.state.img} alt='Profile Picture'/>
      </div>
    )
  }
}
