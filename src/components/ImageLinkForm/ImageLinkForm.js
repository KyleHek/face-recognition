import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div>
            <p className='f3 pa2 white-90 tc'>
                {'This app will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='input center pa4 br3 shadow-5'>
                <input 
                    className='f4 pa2 w-80 inset' 
                    type='text' 
                    placeholder='url' 
                    onChange={onInputChange}
                />
                <button 
                    className='b ph3 pv2 ba white-90 inset bg-blue w-20 grow pointer f5 dib' 
                    onClick={onImageSubmit}>{'Detect'}
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm;

// grow f4 w-20 link ph3 pv2 white bg-blue