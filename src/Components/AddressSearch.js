import React, {Component} from 'react';
import Panel from './Panel';

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

class AddressSearchResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {searchResult} = this.props;

        let address = {
            street: searchResult.rua,
            neighborhood: searchResult.bairro,
            city: searchResult.cidade,
            state: searchResult.uf,
            zipCode: searchResult.cep,
        };

        return (
            <div className="address-search-result">
                <AddressInfo address={address}/>
            </div>
        );
    }
}

class AddressSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
            isValid: false,
        }
    }

    render() {
        return (
            <div className="address-search-bar">
                <p>Consultar</p>
                <form>
                    <label>CEP</label>
                    <input name="zipcode" type="text" placeholder="00000-000"/>
                    <button disabled={!this.state.isValid}>Buscar</button>
                </form>
            </div>
        );
    }
}

class AddressSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const searchResult = {
            rua: 'Rua Miguel Mentem',
            bairro: 'Vila Guilherme',
            cidade: 'São Paulo',
            uf: 'SP',
            cep: '02050-010',
        };
        return (
            <Panel title="Consultar Endereço"
                   className="address-search-panel">
                <AddressSearchBar />
                <AddressSearchResult searchResult={searchResult}/>
            </Panel>
        );
    }
}

export default AddressSearch;