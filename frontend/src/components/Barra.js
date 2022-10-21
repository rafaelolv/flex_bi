import React, { Component } from 'react';

import style from '../style/Painel.module.css';

class Barra extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        return (
            <div style={this.props.porcentagem} className={style.barra}></div>
        )
    };
};

export default Barra;