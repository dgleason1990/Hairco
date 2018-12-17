import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocationModal extends Component {
    constructor(){
        super();
        this.addressRef = React.createRef()
    }

    addressFunction = ()=>{
        this.props.clientLocation(this.addressRef.current.value)
        console.log(this.addressRef.current.value)
    }

    render() {
        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                <button style={close} onClick={this.props.handleClose}>X Close</button>
                    <h1 style={h1}>Enter your Address to find the nearest stylists</h1>
                    <form style={form}>
                        <label> 
                            Your Address: 
                            <textarea ref={this.addressRef} name='address'></textarea>
                        </label>
                    </form>
                    <div onClick={this.addressFunction} className='modelSubmit'>  Find your stylists </div> 
                </div>
            </div>
        );
    }
}

LocationModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default LocationModal;

const flex = {
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(57,57,57,0.6)',
    fontSize: '2rem'
};
const h1 = {
    'padding': '15px'
}
const modalLayer = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: 1,
    backgroundColor: 'transparent'
  };
  
  const formModal = {
    position: 'absolute',
    color: 'rgb(238, 211, 142)',
    backgroundColor: 'rgb(21, 21, 21)',
    width: '600px',
    maxWidth: '100%',
    height: '600px',
    maxHeight: '100%',
    zIndex: 2,
    borderRadius: '3px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  };

  const form = {
    marginTop: '4vw',
    marginBottom: '2vw',
    };
    
    const close = {
        border: 'none',
        color: '#eed38e',
        fontSize: '1.3rem',
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        cursor: 'pointer'
    }