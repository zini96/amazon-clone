import React from 'react';
import './Bestseller.css';

function Bestseller({image, title}) {
    return (
        <div className='best_p'>
            <img className='best_img' src={image} alt='product1'/>
            <div className='best_info'>
                <p className='best_name'>{title}</p>
            </div>
        </div>
    );
}

export default Bestseller;