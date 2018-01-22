import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class AddressMap extends Component {

    componentDidUpdate(prevProps, prevState) {
        this.loadMap();
        this.updateLocation();
    }

    loadMap() {

        if (this.props && this.props.google && !this.map) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const mapConfig = Object.assign({}, {
                center: {lat: 0, lng: 180},
                zoom: 16,
                disableDefaultUI: true,
                draggable: false,
                scrollwheel: false,
            })
            this.map = new maps.Map(node, mapConfig);
            this.marker = new google.maps.Marker({
                map: this.map
            });
        }
    }

    updateLocation() {

        if (this.props && this.props.google && this.map) {
            const {google} = this.props;
            const maps = google.maps;
            const geocoder = new maps.Geocoder();
            const {searchResult} = this.props;

            geocoder.geocode({'address': searchResult.cep}, function (results, status) {
                if (status === 'OK') {
                    this.map.setCenter(results[0].geometry.location);
                    this.marker.setPosition(results[0].geometry.location);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                    alert('Não foi possível obter a localização, tente novamente');
                }
            }.bind(this));
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '100%',
            position: 'relative',
        };
        return (
            <div className="address-map" ref="map" style={style}>
                Aguarde, carregando mapa ...
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBtaFrTuYiVD6ugzkNz0DeiYZ6YYgNdd7o'
})(AddressMap)