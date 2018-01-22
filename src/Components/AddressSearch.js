import React, {Component} from 'react';
import Panel from './Panel';
import fetchJsonp from 'fetch-jsonp';
import AddressMap from './AddressMap';
import MaskedInput from 'react-text-mask';
import './AddressSearch.css';
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
        this.state = {
            visible: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchResult !== prevProps.searchResult) {
            this.setState({visible: this.props.searchResult != null});
        }
    }

    render() {

        const searchResult = this.props.searchResult

        if (!searchResult)
            return null

        const error = searchResult.erro;
        let el = null;

        if (error) {
            el = (
                <div className="address-result-error">
                    <ErrorMessage message="Endereço não encontrado para o CEP informado."/>
                </div>
            )
        } else {
            const address = {
                street: searchResult.logradouro,
                neighborhood: searchResult.bairro,
                city: searchResult.localidade,
                state: searchResult.uf,
                zipCode: searchResult.cep,
            };

            el = (
                <div className="address-result-success" >
                    <button className="close-button" onClick={(event) => this.handleClose(event)}>X</button>
                    <AddressInfo address={address}/>
                    <div className="address-map-wrapper">
                        <AddressMap searchResult={this.props.searchResult}/>
                    </div>
                </div>
            )
        }

        const style = {
            display: this.state.visible ? 'block' : 'none'
        }

        return (
            <div className="address-search-result" style={style}>
                {el}
            </div>
        );
    }

    handleClose(e) {
        this.setState({
            visible: false
        });
    }

}

class AddressSearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zipcode: this.props.zipcode,
            isValid: false,
        };
        this.zipRegex = /^[0-9]{5}-[0-9]{3}$/;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="address-search-bar">
                <p className="address-search-bar-title">Consultar</p>
                <form className="address-search-bar-form" onSubmit={(event) => this.handleSubmit(event)}>
                    <label>CEP</label>
                    <MaskedInput type="tel"
                                 autoComplete="off"
                                 name="zipcode"
                                 value={this.state.zipcode}
                                 placeholder="00000-000"
                                 onChange={(event) => this.handleChange(event)}
                                 mask={[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/, '-', /[0-9]/,/[0-9]/,/[0-9]/]}  />
                    <button disabled={!this.state.isValid}>Buscar</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({zipcode: e.target.value}, this.validateInput);
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
        this.state = {searchResult: undefined}
        this.handleSearch = this.handleSearch.bind(this);
    }

    render() {
        return (
            <Panel title="Consulta de endereço"
                   className="address-search-panel">
                <AddressSearchBar
                    onSubmit={this.handleSearch}/>
                <AddressSearchResult searchResult={this.state.searchResult}/>
            </Panel>
        );
    }

    handleSearch(zipCode) {

        const cleanZipCode = zipCode.replace(/\D/g, '');

        fetchJsonp(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                this.setState({searchResult: json})
            }.bind(this))
            .catch(function (ex) {
                this.setState({searchResult: null})
            }.bind(this))
    }
}

export default AddressSearch;