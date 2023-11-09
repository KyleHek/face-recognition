import React from 'react';
import './FaceRecongnition.css';

const FaceRecongnition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma mt3 mb3'>   
            <div style={{position: "relative"}}>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                {
                    boxes.map((box, i) => {
                        const { topRow, rightCol, bottomRow, leftCol } = box;
                        return (<div key={i} id='face' className='bounding-box' style={{top: topRow, left:leftCol, bottom: bottomRow, right: rightCol }}></div>);
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecongnition;