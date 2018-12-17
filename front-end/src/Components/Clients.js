import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MapContainer from './MapContainer';


export default class Clients extends Component {

  render() {
    let  stylistData = (data) => { 
        return (
            <div className='stylistCard'>
                <Link to={`/yourStylists/${data._id}`}>
                    <img src={data.img} />
                </Link>
                <div className='name'>
                    {data.name}
                </div>
                <div className='rating'> 
                    Rating: {data.rating} 
                </div>
            </div>
        )
    }
    return (
      <div className='clientPage'>
        <MapContainer clients={this.props.clients} stylists={this.props.stylists} history={this.props.history}/>
        {/* <h1>
            Stylists in your area:
        </h1>
        <div className='stylists'>
            {this.props.stylists.map((data) => stylistData(data))}
        </div> */}
      </div>
    )
  }
}
