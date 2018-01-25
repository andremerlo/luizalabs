import React, {Component} from 'react';

class ErrorMessage extends Component {
    render() {
        return (
            <div className="error-msg">{this.props.message}</div>
        )
    }
}

export default ErrorMessage;