"use strict";
import React, {Component} from 'react';

class Main extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Main;