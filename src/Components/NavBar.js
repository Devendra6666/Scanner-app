import React, { useEffect } from 'react'
import styles from './NavBar.module.css'

function NavBar(props) {

    useEffect(() => {
        let changeMode = localStorage.getItem('changedMode')

        if (changeMode === '1') {
            props.setIsChangedMode(true)
        }
    }, [props])

    let decodeQrHandler = () => {
        localStorage.setItem('changedMode', '1')
        props.setIsChangedMode(true)
    }

    let generateQrHandler = () => {
        localStorage.removeItem('changedMode')
        props.setIsChangedMode(false)
    }
    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                <h1>QR-Code Generator</h1>
            </div>
            <div className={styles.links}>
                {props.isChangedMode && <div>
                    <h1
                        onClick={generateQrHandler}
                    >Generate QR-code</h1>
                </div>
                }
                {!props.isChangedMode &&
                    <div>
                        <h1
                            onClick={decodeQrHandler}
                        >Scan QR-code</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar