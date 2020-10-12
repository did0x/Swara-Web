import React, { Component } from 'react';
import Button from '../button';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

class Navbar extends Component {
    state = {
        is_open: false,
        links : [
            {
                route: '/',
                text: 'Beranda'
            },
            {
                route: '/',
                text: 'Jadwal'
            },
            {
                route: '/',
                text: 'Riwayat'
            }
        ]
    }

    renderNavbar = () => {
        let list;
        list = this.state.links.map((data, index) =>
            <li key={index}>
                <Link to={data.route}>{data.text}</Link>
            </li>
        )
        return list;
    }

    toggleMenu = (data) => {
        this.setState({
            is_open: data
        })
    }

    render() {
        const { is_open } = this.state;
        return (
            <div className={styles.navbar}>
                {/* <div className={styles.navbar_mobile}>
                    <div className={styles.navbar_top}>
                        <div className="nav_logo">
                            <Link to={`/`}>
                            </Link>
                        </div>
                        <div className={`${styles.nav_btn} ${is_open ? `active` :  ``}`} onClick={() => this.toggleMenu(!is_open)}>
                            <span className={styles.top}></span>
                            <span className={styles.middle}></span>
                            <span className={styles.bottom}></span>
                        </div>
                    </div>
                    <div className={`${styles.nav_overlay} ${is_open ? `open` : ``}`} onClick={() => this.toggleMenu(false)}>
						<ul>
							{this.renderNavbar()}
						</ul>
                    </div>
                </div>   */}
                <div className={styles.navbar_desktop}>
                    <div className={styles.nav_left}>
                        <Link to={`/`}>
							<img src={require('../../../assets/img/logo.svg')} alt="" />
                        </Link>
						<div className={styles.items}>
							<ul>
								{this.renderNavbar()}
							</ul>
						</div>
                    </div>
                    <div className={styles.nav_items}>
                        <Button btnType="outline" onClick="">Masuk</Button>
						<Button btnType="primary" onClick="">Daftar</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;