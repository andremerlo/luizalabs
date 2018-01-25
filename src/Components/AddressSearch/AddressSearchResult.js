import React, {Component} from 'react';
import AddressMap from './AddressMap';
import AddressInfo from './AddressInfo';
import ErrorMessage from '../Message/ErrorMessage';

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
                    <button className="close-button" onClick={(event) => this.handleClose(event)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
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

export default AddressSearchResult;