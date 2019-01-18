import React, { Component } from 'react';


export default class StylistDashboard extends Component {
    state={
        loading: true,
        auth: false,
        data: '',
        goals:{
            monthlyGoal: 100,
            sales: 10
        }
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

      monthlyChange = (e)=>{
          this.setState({
              monthlyGoal: e.target.value
          })
      }

      submitMonthly = (e) =>{
          e.preventDefault();
          let init = { 
            method:'POST',
            body:JSON.stringify(this.state.monthlyGoal),
            headers:{
                "content-type": "application/json"}
                }
          fetch('/goals', init)
          .then(res=>console.log(res))
      }

      saleChange=(e)=>{
          this.setState({
              sales: e.target.value
          })
      }

      submitSale = (e) =>{
          e.preventDefault();
          console.log(this.state)
          let init = {
            method: 'POST',
            body: JSON.stringify(this.state.sales),
            headers:{
                'content-type':'application/json'
                }
            }
            fetch('/sales', init)
            .then(res=>console.log(res))
      }

  render() {
      let goalCalc = (data) =>{ 
          let value = data.sales/data.monthlyGoal*100 + '%'
        return value
      }
    return (
      <div className='dashboard'>
        <h1> Welcome to your dashboard {this.state.data.name} </h1>
        <img src={this.state.data.img} alt='Profile Picture'/>
        <h2> Your current rating is: {this.state.data.rating} </h2>
        <div> 
            <h2> Set your monthly goals. </h2>
            <h3> How much do you aim to make? </h3>
            <form>
                Monthly goal: <input type='number' onChange={ this.monthlyChange }/>
                <button onClick={this.submitMonthly}> Submit </button>
            </form>
        </div>
        <div>
            <h2> Track your sales.</h2>
            <h2> Enter sales </h2>
            <form>
                Sale: <input type='number' onChange={ this.saleChange }/>
                <button onClick={this.submitSale}> Submit </button>
            </form>
        </div>
        <div>
            <h2> Goal </h2>
            {goalCalc(this.state.goals)} completed
        </div>
      </div>
    )
  }
}
