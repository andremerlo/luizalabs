import React, {Component} from 'react';

class AddressInfo extends Component {
    render() {
        const {address} = this.props;
        return (
            <div className="address-info">
                <p className="street">{address.street}</p>
                <p className="neighborhood">{address.neighborhood}</p>
                <p className="city-state">{address.city} - {address.state}</p>
                <p className="zip-code">{address.zipCode}</p>
            </div>
        )
    }
}

export default AddressInfo;