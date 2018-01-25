import React, {Component} from 'react';
import Panel from '../Panel';
import AddressSearchBar from './AddressSearchBar';
import AddressSearchResult from './AddressSearchResult';
import fetchJsonp from 'fetch-jsonp';
import './AddressSearch.css';
require('es6-promise').polyfill();

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