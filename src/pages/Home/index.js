import React, { Component } from 'react';
import styles from './Home.module.scss'
import Carousel from 'helper/component/carousel';
import Footer from 'pages/Footer';
import Button from 'helper/component/button';

class Home extends Component {
    render() {
        return (
            <div className={styles.home}>
                <div className={styles.section_rekomendasi}>
                    <h1>Rekomendasi</h1>
                    <div className={styles.content}>
                        <div className={styles.content_card}>
                            <img src={require("../../assets/img/image2.png")} alt=""/>
                            <p className={styles.label_img}>88 Rising Star Virtual Tour</p>
                        </div>
                        <div className={styles.content_card}>
                            <img src={require("../../assets/img/image3.png")} alt=""/>
                            <p className={styles.label_img}>Konser #DiRumahAja</p>
                        </div>
                    </div>
                </div>
                <div className={styles.section_nonton}>
                    <div className={styles.header}>
                            <h1>Nonton Yuk!</h1>
                            <p className={styles.header_more}>Lihat Semua Konser</p>
                    </div>
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
                        <div className={styles.content_card}>
                            <img src={require("../../assets/img/nonton4.png")} alt=""/>
                            <p className={styles.date_text}>12 Oktober 2020</p>
                            <p className={styles.title_text}>Lexycon Concert by Isyana</p>
                            <p className={styles.ticket_text}>Tiket tersedia</p>
                        </div>
                    </div>
                </div>
                <div className={styles.section_fitur}>
                    <h3>Fitur Swara</h3>
                    <h4>Di Swara bisa ngapain aja ya?</h4>
                    <div className={styles.content}>
                        <div className={styles.card}>
                            <img src={require('../../assets/img/icon-tickets.svg')} alt="" />
                            <h2>Beli Tiket #DiRumahAja</h2>
                            <p>Pengin beli tiket konser musik online anti pusing?</p>
                            <p>Di Swara kamu bisa beli tiket konser musik impianmu dengan mudah dengan tetep di rumah aja.</p>
                        </div>
                        <div className={styles.card}>
                            <img src={require('../../assets/img/icon-concert.svg')} alt="" />
                            <h2>Liat Konser #DariRumahAja</h2>
                            <p>Hei kamu, jangan ngegalau lagi ya sekarang.</p>
                            <p>Dengan Swara kamu bisa tetep nonton konser musik idolamu walaupun dari rumah aja.</p>
                        </div>
                        <div className={styles.advice}>
                            <img src={require('../../assets/img/icon-small-music.svg')} alt="" />
                            <p>“Yuk nonton konser lewat Swara dan jangan lupa ajak temen kamu juga.”</p>
                            <span>👩🏻‍ Mimin Swara</span>
                        </div>  
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.content}>
                        <div className={styles.paragraph}>
                            <img src={require('../../assets/img/icon-small-favorite.svg')} alt="" />
                            <h1>Ngonser Virtual Rasa Ketemuan</h1>
                            <p>Swara bikin kamu ngrasain konser virtual  serasa ketemu di dunia nyata.</p>
                            <p>Chat sesukamu, berekspresi sepuasmu.</p>
                        </div>
                        <div className={styles.video}>
                            <div className={styles.background_border}></div>
                            <iframe src='https://www.youtube.com/embed/aC1rkJazf7Y?autoplay=1'
                                    frameBorder='0'
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                    title='video'
                                    width='550px'
                                    height='360px'
                            />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.paragraph}>
                            <img src={require('../../assets/img/icon-small-music.svg')} alt="" />
                            <h1>Ingin berkolaborasi bersama kami?</h1>
                            <p>Kami tak sabar untuk memberikan layanan terbaik untuk konser kamu</p>
                            <Button margin="no_margin" btnType="primary" onClick="">Bikin Konser</Button>
                        </div>
                        <div className={styles.content_testimoni}>
                            <div className={styles.card}>
                                <img src={require('../../assets/img/icon-friends.svg')} alt="" />
                                <h2>Bikin konser #lewatRumahAja</h2>
                                <p>100+ acara telah berhasil diselenggarakan melaui Swara</p>
                            </div>
                            <div className={styles.card_long}>
                                <img src={require('../../assets/img/profile.svg')} alt="" />
                                <div className={styles.text}>
                                    <h2>“Mantap, senang rasanya bisa bekerja sama dengan Swara.”</h2>
                                    <p>Raden Alexandria, Founder WTF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section_partner}>
                    <h1>Partner Kami</h1>
                    <div className={styles.content}>
                        <div className={styles.content_item}>
                            <img src={require('../../assets/img/partner_universal.png')} alt="" />
                        </div>
                        <div className={styles.content_item}>
                            <img src={require('../../assets/img/partner_disney.png')} alt="" />
                        </div>
                        <div className={styles.content_item}>
                            <img src={require('../../assets/img/partner_wtf.png')} alt="" />
                        </div>
                        <div className={styles.content_item}>
                            <img src={require('../../assets/img/partner_telkom.png')} alt="" />
                        </div>
                        <div className={styles.content_item}>
                            <img src={require('../../assets/img/partner_proclub.png')} alt="" />
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;