import React, { Component } from 'react';
import "./Panel.css";
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

class Panel extends Component {
    render() {
        return (
            <div className={`panel ${this.props.className}`}>
                <PanelHeader title={this.props.title} />
                <PanelBody>
                    {this.props.children}
                </PanelBody>
            </div>
        );
    }
}

export default Panel;