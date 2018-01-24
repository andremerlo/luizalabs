import React, {Component} from 'react';

class PanelHeader extends Component {
    render() {
        return (
            <div className="panel-header">
                {(this.props.title) &&
                <h1 className="panel-header-title">{this.props.title}</h1>
                }
            </div>
        );
    }
}

export default PanelHeader;