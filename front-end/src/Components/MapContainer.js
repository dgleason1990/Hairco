import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import {apiKey} from '../headers';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
 
export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {
      data:{
        name: '',
        img: '',
        rating: '',
        _id: ''
      }
    },
    showingInfoWindow: false
  };
 
  onMarkerClick = async (props, marker) =>{
    await this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
  console.log(this.state.selectedPlace.data._id)};

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onInfoWindowOpen(props, e) {
    const button = (<button onClick={e => {this.props.history.push(`/yourStylists/${this.state.selectedPlace.data._id}`)}}>Select your Stylist</button>
  );
    ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
  }

  render() {
    let  stylistData = (data) =>{ 
      return (
        <Marker onClick={this.onMarkerClick}
          data={data}
          position={{lat: data.location.coordinates[1].$numberDecimal, lng: data.location.coordinates[0].$numberDecimal}}/>
          )}
         let center = { lat: this.props.stylists[0].location.coordinates[1].$numberDecimal,
                  lng: this.props.stylists[0].location.coordinates[0].$numberDecimal }
    return (
      <Map google={this.props.google} containerStyle={{height:'80%', width:'80%'}} zoom={13} center={center}>
        {this.props.stylists.map((data) => stylistData(data))}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
          onOpen={e => {
          this.onInfoWindowOpen(this.props, e);
          }}>
          <div className='stylistCard'>
            <h1> {this.state.selectedPlace.data.name} </h1>
            <img src={this.state.selectedPlace.data.img} style={{width:'20vw'}}/>
            <h2> Rating: {this.state.selectedPlace.data.rating} </h2>
            <div id="iwc" />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)