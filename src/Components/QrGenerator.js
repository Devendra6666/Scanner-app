import React, { useState } from 'react'
import styles from './QrGenerator.module.css'
import { saveAs } from 'file-saver'
import placeholder from '../Assets/placeholder.jpeg'

function QrGenerator() {
    let [urlInput, setUrlInput] = useState('')
    let [QrImg, setQrImg] = useState([])
    let [QrImgShow, setQrImgShow] = useState(false)
    let [loading, setLoading] = useState(false)

    let formSubmitHandler = (e) => {
        e.preventDefault()
        let url = `https://api.qrserver.com/v1/create-qr-code/?data=${urlInput}`
        setLoading(true)
        setQrImg(url)
        setLoading(false)
        setQrImgShow(true)
        if (urlInput.trim() === '') {
            setQrImgShow(false)
            return
        }
        setUrlInput('')
    }
    const downloadImage = () => {
        saveAs(QrImg, `${QrImg}.jpg`) // Put your image url here.
    }
    let urlInputChangeHandler = (e) => {
        setUrlInput(e.target.value)
    }
    let image = QrImgShow ? QrImg : placeholder
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1>Generate QR-code</h1>
            </div>
            <div className={styles.body_form}>
                <div className={styles.body_form_2}>
                    <form
                        onSubmit={formSubmitHandler}>
                        <div className={styles.inputField}>
                            <label>Enter URL Link</label>
                            <input
                                placeholder='Enter a url'
                                onChange={urlInputChangeHandler}
                                value={urlInput}
                            ></input>
                        </div>
                        <button>Generate Qr-code</button>
                    </form>
                </div>
                <div className={styles.body2}>

                    <div className={styles.qr_code}>
                        <img src={image} alt='Qr code' />
                        {QrImgShow && <button onClick={downloadImage}>Download</button>}
                    </div>

                    {loading && <h4>Loading...</h4>}
                </div>
            </div>
        </div>
    )
}

export default QrGenerator