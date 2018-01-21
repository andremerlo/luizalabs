import React, { Component } from 'react';

class PanelHeader extends Component {
    render() {
        return (
            <h1 className="panel-header">{this.props.title}</h1>
        );
    }
}

class Panel extends Component {
    render() {
        return (
            <div className={`panel ${this.props.className}`}>
                <PanelHeader title={this.props.title} />
                {this.props.children}
            </div>
        );
    }
}

export default Panel;