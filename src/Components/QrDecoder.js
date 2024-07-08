import React from 'react';
import styles from './QrDecoder.module.css'
import QrDecoderCamera from './QrDecoderCamera';



function QrDecoder() {
    // let [isChangedMode, setIsChangedMode] = useState(false)

    // let uploadFileHandler = () => {
    //     setIsChangedMode(false)
    // }

    // let uploadScanHandler = () => {
    //     setIsChangedMode(true)
    // }

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                {/* <h1>QrDecoder</h1> */}
            </div>
            <div className={styles.nav}>
                {/* <div
                    onClick={uploadFileHandler}
                >
                    <h2>Upload File</h2>
                </div> */}

                <div
                // onClick={uploadScanHandler}
                >
                    {/* <h2>Scan Code</h2> */}
                </div>
            </div>
            <QrDecoderCamera />
            {/* {isChangedMode && <QrDecoderFile />} */}
        </div>
    )
}

export default QrDecoder