import React, { Component } from 'react'
import styles from './Footer.module.scss'

class Footer extends Component {
    render() {
        return(
            <div className={styles.footer}>
                <div className={styles.article}>
                    <div className={styles.article_section}>
                        <h4 className={styles.content_header}>Swara</h4>
                        <p className={styles.content_text}>Konser Musik</p>
                        <p className={styles.content_text}>Jadwal Konser</p>
                        <p className={styles.content_text}>Riwayat</p>
                    </div>
                    <div className={styles.article_section}>
                        <h4 className={styles.content_header}>Social Media</h4>
                        <p className={styles.content_text}>Facebook</p>
                        <p className={styles.content_text}>Instagram</p>
                        <p className={styles.content_text}>Twitter</p>
                    </div>
                    <div className={styles.article_section}>
                        <h4 className={styles.content_header}>Bantuan dan Panduan</h4>
                        <p className={styles.content_text}>SwaraCare</p>
                        <p className={styles.content_text}>Syarat dan Ketentuan</p>
                        <p className={styles.content_text}>Kebijakan Privasi</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p className={styles.content_copyright}>© PT.Swara Media. 2020</p>
                    <p className={styles.content_copyright}>#NgonserOnlineRasaKetemuan</p>
                </div>
            </div>
        )
    }
}

export default Footer;