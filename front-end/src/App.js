import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Components/Home';
import Stylists from './Components/Stylists';
import Clients from './Components/Clients';
import YourStylist from './Components/yourStylist';
import Registration from './Components/Registration';
import MapContainer from './Components/MapContainer';
import Login from './Components/Login';
import Dashboard from './Components/StylistDashboard'

class App extends Component {
  state={
    stylists: [
      {
        name: 'No Stylists found in your area',
        rating: 'Not Applicable',
        location: {
          coordinates:[{
            $numberDecimal: 40.7128
          },
          {
            $numberDecimal: 74.0060
          }]
        }
      }
    ],
    clients:{
      location: ''
    },
    loading: true
};

  clientLocation = async (location)=>{
    await this.setState({
      clients:{
        location: location
      }
    })
    let init ={
      method:'POST',
      body:JSON.stringify(this.state.clients),
      headers: {
        "content-type": "application/json"
      }
    }
    await fetch('http://localhost:8080/client', init)
    .then((response) => response.json())
    .then(async (data)=>{
      await this.setState({
        stylists: data
      })
    })
  }

  render() {
    return (
      <div className="App">
      <div className='background'>
        <div className='brushBackground'>
         </div>
      </div>
          <div className="main">
            <Nav clientLocation={this.clientLocation} />
            <div>
              <Switch>
                <Route path='/home' render={()=>
                {return <Home clientLocation={this.clientLocation}/>}}/>
                <Route exact path='/' render={() => <Redirect to='/home'/> }/>
                {/* <Route path='/stylists' component={ Stylists }/> */}
                <Route path='/clients' exact render={(props) => 
                {return <Clients stylists={this.state.stylists} clients={this.state.clients} {...props}  />}}/>
                <Route path='/yourStylists/:id' render={() => 
                {return <YourStylist stylists={this.state.stylists} />}}/>
                <Route path='/registration' component={ Registration }/>
                <Route path='/login' component={Login}/>
                <Route path='/dashboard/:id' component={Dashboard}/>
                <Route path='/clients' exact render={(props) => 
                {return <MapContainer {...props} stylists={this.state.stylists} clients={this.state.clients}/>}}/>/>
              </Switch>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
