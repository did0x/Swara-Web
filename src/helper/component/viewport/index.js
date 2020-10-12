import React, { Component} from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';

class ViewportRestrict extends Component {
    render() {
    	const {display} = this.props;
    	if(!display){
    		return false;
    	}

    	return (
            <div 
                className={`${styles.wp_pop} ${styles[this.props.type]}`}
                style={{
                    backgroundColor: `${this.props.backgroundColor}`
                }}
            >
                <div className={styles.wp_content}>
                    <div 
                        className={styles.wp_pop_img} 
                        style={{
                            backgroundImage: `url("${this.props.image}")`,
                            animation: !this.props.animation ? "initial" : `${styles.rotateA} ${this.props.animationSpeed}ms ease infinite alternate`
                        }}>
                    </div>
                    <p className={styles.wp_tips}>
                   		{this.props.text}
                   	</p>
                </div>
            </div>
        );
    }
}

ViewportRestrict.defaultProps = {
    display: false,
    text: 'Silahkan buka di smartphone kamu atau putar smartphone kamu ke posisi vertical untuk visual yang lebih baik.',
    image: require('./scape.png'),
    animation: true,
    animationSpeed: 1500,
    backgroundColor: 'rgba(9, 18, 34, 1)'
};

ViewportRestrict.propTypes = {
    display : PropTypes.bool,
    text: PropTypes.string,
    image: PropTypes.node,
    type: PropTypes.oneOf(['landscape', 'portrait', 'desktop_landscape']).isRequired,
    animation: PropTypes.bool,
    animationSpeed: PropTypes.number,
    backgroundColor: function(props, propName, componentName) {
        if (props[propName].indexOf('rgb') < 0) {
            if (props[propName].indexOf('#') < 0) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. Only accept RGB or Hex code.'
                );
            }
        }
    },
}

export default ViewportRestrict;