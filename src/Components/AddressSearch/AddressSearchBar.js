import React, {Component} from 'react';
import MaskedInput from 'react-text-mask';

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

export default AddressSearchBar;