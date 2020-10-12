import Footer from 'pages/Footer'
import React, { Component } from 'react'
import styles from './Search.module.scss'

class Search extends Component {
    render() {
        return (
            <div>
                <div className={styles.search}>
                    <div className={styles.search_side}>
                        <form>
                            <div className={styles.radio_group}>
                                <h4>Urutkan Berdasarkan</h4>
                                <fieldset id="sort">
                                    <label>
                                        <input type="radio" value="harga_max" name="sort" checked/>
                                        Harga Tertinggi
                                    </label>
                                    <label>
                                        <input type="radio" value="harga_min" name="sort"/>
                                        Harga Terendah
                                    </label>
                                    <label>
                                        <input type="radio" value="rekomendasi" name="sort"/>
                                        Rekomendasi
                                    </label>
                                    <label>
                                        <input type="radio" value="terbaru" name="sort"/>
                                        Terbaru
                                    </label>
                                </fieldset>
                            </div>
                            <div className={styles.filter_group}>
                                <div className={styles.group_header}>
                                    <h4>Filter Pencarian</h4>
                                    <p>Reset</p>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className={styles.search_content}>
                        <h2>3 Ditemukan</h2>
                        <div className={styles.content}>
                            <div className={styles.content_card}>
                                <img src={require("../../assets/img/nonton1.png")} alt=""/>
                                <p className={styles.date_text}>12 Oktober 2020</p>
                                <p className={styles.title_text}>We The Fest 2020</p>
                                <p className={styles.ticket_text}>Tiket tersedia</p>
                            </div>
                            <div className={styles.content_card}>
                                <img src={require("../../assets/img/nonton2.png")} alt=""/>
                                <p className={styles.date_text}>12 Oktober 2020</p>
                                <p className={styles.title_text}>We The Fest Session A 2020</p>
                                <p className={styles.ticket_text}>Tiket tersedia</p>
                            </div>
                            <div className={styles.content_card}>
                                <img src={require("../../assets/img/nonton3.png")} alt=""/>
                                <p className={styles.date_text}>12 Oktober 2020</p>
                                <p className={styles.title_text}>We The Fest 2.0</p>
                                <p className={styles.ticket_text}>Tiket tersedia</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            
        )
    }
}

export default Search;