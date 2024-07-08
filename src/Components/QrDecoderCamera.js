import React, { useState, useEffect } from 'react';
import styles from './QrDecoderCamera.module.css';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { jsPDF } from 'jspdf';
import "./QrDecoderCamera.css"

function QrDecoderCamera() {
    const [scans, setScans] = useState([{
        
    }
    ],[]);
    // const [list,setList] = useState([])
    // console.log(list)
// const arr = []
    useEffect(() => {
        const storedScans = JSON.parse(localStorage.getItem('qrScans')) || [];
        setScans(storedScans);
        // console.log(storedScans)
    });

    const handleResult = (result, error) => {
    //      
        //  setList()
        if (result) {
            const isDuplicate = scans.some(scan => scan.details === result?.text);
            // console.log(isDuplicate)
            if (!isDuplicate) {
                const scanData = {
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    details: result.text || 'No details'
                };
            // console.log(scanData.details)
            // //              
            // let updatedScans = [...scans, scanData];
            // console.log("update",updatedScans)
            const temp = scans;
            temp.push(scanData)

            setScans((prev)=>[scanData,...prev]);
            console.log(scans.length)
            localStorage.setItem('qrScans', JSON.stringify(scans));
            // console.log('Updated Scans:', updatedScans);
                 const storedScans = JSON.parse(localStorage.getItem('qrScans')) || [];
       setScans(storedScans);
            }
            else{
                alert("already scanned")
            }
        }

        // if (error) {
        //     console.error(error);
        // }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        let y = 10;
        doc.text('QR Scan Results', 10, y);
        y += 10;

        scans.forEach((scan, index) => {
            doc.text(`S.No: ${index + 1}, Date: ${scan?.date ?? 'N/A'}, Time: ${scan?.time ?? 'N/A'}, Details: ${scan?.details ?? 'N/A'}`, 10, y);
            y += 10;
        });

        doc.save('QR_Scan_Results.pdf');
    };

    const exportToCSV = () => {
        const headers = ['S.No', 'Date', 'Time', 'QR Details'];
        const rows = scans.map((scan, index) => [index + 1, scan?.date ?? 'N/A', scan?.time ?? 'N/A', scan?.details ?? 'N/A']);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'QR_Scan_Results.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearTable = () => {
        setScans([]);
        localStorage.removeItem('qrScans');
    };

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1>Scan QR code</h1>
                <h1>Scanner Count : {scans.length}</h1>
            </div>
            <div className={styles.camera}>
                <QrReader
                    onResult={handleResult}
                    constraints={{ facingMode: 'environment' }}
                    style={{ width: '100%' }}
                />
            </div>
            {/* {
               scans.map((ele,index) => {
                    return(
                        <>
                         <div key={index}>
                    <p>{index + 1}</p>
                    <p>{ele?.date ?? 'No Date'}</p>
                    <p>{ele?.time ?? 'No Time'}</p>
                    <p>{ele?.details ?? 'No Details'}</p>
                     <button onClick={exportToPDF}>Export to PDF</button>
                    <button onClick={exportToCSV}>Export to CSV</button>
                    <button onClick={clearTable}>Clear Table</button>
                </div>
                        </>
                    )
                    
                    
              })
                
            } */}
            {scans.length > 0 && (
                <div className={styles.results}> 
                    <h2>Scanned QR Codes</h2>
                 {scans.map((scan, index) => (
                                <div key={index}>
                                    <p>{index + 1}</p>
                                    <p>{scan?.date ?? 'No Date'}</p>
                                    <p>{scan?.time ?? 'No Time'}</p>
                                    <p>{scan?.details ?? 'No Details'}</p>
                                </div>
                            ))} 
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>QR Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    <button onClick={exportToPDF}>Export to PDF</button>
                    <button onClick={exportToCSV}>Export to CSV</button>
                    <button onClick={clearTable}>Clear Table</button>
                </div>
            )}
            {
                scans.map((curele,index) => {
                    <div className='container'>
                          <div className='details'  key={index}>
                                <p>{index+1}</p>
                                <h4 style={{marginRight:"100px"}}>{curele?.date??'No date'}</h4>
                                <h4>{ curele?.time ?? 'No Time'}</h4>
                                <h4>{curele?.details ?? 'No Details'}</h4>
                                </div>
                    </div>
                })
            }
            
        </div>
    );
}

export default QrDecoderCamera;
