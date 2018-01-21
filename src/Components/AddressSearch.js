import React, {Component} from 'react';
import Panel from './Panel';
import fetchJsonp from 'fetch-jsonp';
require('es6-promise').polyfill();

class ErrorMessage extends Component {
    render() {
        return (
            <div className="error-msg">{this.props.message}</div>
        )
    }
}

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

        const searchResult = this.props.searchResult

        if(!searchResult)
            return null

        const error = searchResult.erro;
        let el = null;

        if(error){
            el = (
                <div className="address-result-error">
                    <ErrorMessage message="Endereço não encontrado para o CEP informado."/>
                </div>
            )
        } else {
            let address = {
                street: searchResult.logradouro,
                neighborhood: searchResult.bairro,
                city: searchResult.localidade,
                state: searchResult.uf,
                zipCode: searchResult.cep,
            }
            el = (
                <div className="address-result-success">
                    <AddressInfo address={address} />
                </div>
            )
        }

        return (
            <div className="address-search-result">
                {el}
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
        };
        this.zipRegex = /^[0-9]{5}-[0-9]{3}$/;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="address-search-bar">
                <p>Consultar</p>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>CEP</label>
                    <input name="zipcode" value={this.state.zipcode} type="text" placeholder="00000-000"
                           onChange={(event) => this.handleChange(event)}/>
                    <button disabled={!this.state.isValid}>Buscar</button>
                </form>
            </div>
        );
    }

    handleChange(e) {

        const re = /^[0-9]{1,5}$|^[0-9]{5}-[0-9]{0,3}$/;
        const prevValue = this.state.zipcode;
        const value = e.target.value;
        let finalValue = value;

        //aplica uma máscara enquanto digita
        if ((prevValue.length < 5 && value.length >= 5)
            || (prevValue.length === 5 && value.length > 5)) {
            finalValue = value.substr(0, 5) + '-' + value.substr(5, 3);
        } else if ((prevValue.length > 6 && value.length === 6)) {
            finalValue = value.substr(0, 5);
        }

        if (finalValue === '' || re.test(finalValue)) {
            this.setState({zipcode: finalValue}, this.validateInput);
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.isValid && this.props.onSubmit) {
            this.props.onSubmit(this.state.zipcode);
        }
    }

    validateInput() {
        this.setState({isValid: this.zipRegex.test(this.state.zipcode)})
    }
}

class AddressSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResult: undefined }
        this.handleSearch = this.handleSearch.bind(this);
    }
    render() {
        return (
            <Panel title="Consultar Endereço"
                   className="address-search-panel">
                <AddressSearchBar
                    onSubmit={this.handleSearch} />
                <AddressSearchResult searchResult={this.state.searchResult}/>
            </Panel>
        );
    }
    handleSearch(zipCode) {

        const cleanZipCode = zipCode.replace(/\D/g, '');

        fetchJsonp(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                this.setState({searchResult: json})
            }.bind(this))
            .catch(function(ex) {
                this.setState({searchResult: null})
            }.bind(this))
    }
}

export default AddressSearch;