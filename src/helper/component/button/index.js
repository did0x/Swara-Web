import React, { Component } from 'react';
import styles from './style.module.scss';

class Button extends Component {
    render() {
        return(
            <button 
                className={`${styles.btn} ${styles[this.props.btnType]} ${styles[this.props.margin]}`}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button;