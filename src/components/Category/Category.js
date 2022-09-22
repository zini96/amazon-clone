import React from 'react';
import './Category.css';
import Bestseller from '../Bestseller/Bestseller';


function category({category, tag}) {
    if(tag === "A"){
        return (
            <div className='category'>
                <p className='category_name'>{category}</p>
                <div className='category_bestseller'>
                    <Bestseller
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/computer120x._SY85_CB468850970_.jpg'
                        title="Computers & Accessories"
                    />
                    <Bestseller
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/August/DashboardCard/PS4_120X._SY85_CB438749318_.jpg'
                        title="Video Games"
                    />
                    <Bestseller
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/Baby120X._SY85_CB468850882_.jpg'
                        title="Baby"
                    />
                    <Bestseller
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/February/Dashboard/Toys120X._SY85_CB468851693_.jpg'
                        title="Toys & Games"
                    />
                </div>
                <button>See more</button>
            </div>
        );
    }else if(tag ==="B"){
        return(
            <div className='category'>
                <p className='category_name'>{category}</p>
                <div className='category_bestseller'>
                    <Bestseller
                        image='https://m.media-amazon.com/images/I/31rFCfHnlpL.jpg'
                        title="Electronics"
                    />
                    <Bestseller
                        image='https://m.media-amazon.com/images/I/41FjUIXBaIL.jpg'
                        title="Home"
                    />
                    <Bestseller
                        image='https://m.media-amazon.com/images/I/51RgWQIBE4S.jpg'
                        title="Sports & Outdoors"
                    />
                    <Bestseller
                        image='https://m.media-amazon.com/images/I/41PGxvVCd2L.jpg'
                        title="Camera & Photo"
                    />
                </div>
                <button>See more</button>
            </div>
        )
    }
}

export default category;