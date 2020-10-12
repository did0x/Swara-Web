import React from 'react';
import styles from './style.module.scss'

class Carousel extends React.Component {

    state = {
        current: 0,
    }

    handlePrev() {
        if (this.state.current - 1 >= 0)
            this.setState(prevState => ({ current: prevState.current - 1 }))
        else
            this.setState({ current: this.props.children.length - 1 });
    }

    handleNext() {
        if (this.state.current + 1 < this.props.children.length)
            this.setState(prevState => ({ current: prevState.current + 1 }))
        else
            this.setState({ current: 0 })
    }

    render() {
        const { children } = this.props
        return <div className={styles.carousel}>
            <div className={styles.prev} onClick={() => this.handlePrev()}>&#10094;</div>
            <div className={styles.container}>
                {/* <ul className={styles.slides}>
                    <li className={styles.slide} style={{ backgroundImage: `url('../../../assets/img/image1.png')` }}></li>
                    <li className={styles.slide} style={{ backgroundImage: `url('../../../assets/img/image1.png')` }}></li>
                </ul> */}
                <div className={`${styles.item} ${this.state.current === 0 ? styles.show : styles.hidden}`}>
                    <img src={require('../../../assets/img/image1.png')} alt="" />
                </div>
                <div className={`${styles.item} ${this.state.current === 1 ? styles.show : styles.hidden}`}>
                    <img src={require('../../../assets/img/image1.png')} alt="" />
                </div>
            </div>
            <div className={styles.next} onClick={() => this.handleNext()}>&#10095;</div>
        </div>
    }
}

export default Carousel;