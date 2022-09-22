import React from "react";
import './Home.css'
import Product from '../Product/Product';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Slider from "../Slider/Slider";

function Home() {
    return (
        <div className='home'>
            <Slider tag="Top"/>
            <div className='home_container'>
                <div className='home_row'>
                    <Category tag="A" category="Shop by Category"/>
                    <Category tag="B" category="Deal of the Day"/>
                    <Banner/>
                </div>
                <div className='home_row'>
                    <Product
                        id={4}
                        title="product1"
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/FathersDay/322396794.png'
                        price={65000}
                        rating={3}
                    />                    
                    <Product
                        id={5}
                        title="product2"
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/FathersDay/172063969.png'
                        price={475000}
                        rating={4}
                    />
                    <Product
                        id={6}
                        title="product3"
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/FathersDay/298812796.png'
                        price={1230000}
                        rating={5} 
                    />
                    <Product
                        id={7}
                        title="product4"
                        image='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg'
                        price={620000}
                        rating={4} 
                    />
                </div>
                <div className='home_row'>
                    <Product
                        id={8}
                        title="product5"
                        image='https://m.media-amazon.com/images/I/71yIaIlUVzL._MCnd_AC_UL320_.jpg'
                        price={48000}
                        rating={5} 
                    />                    
                    <Product
                        id={9}
                        title="product6"
                        image='https://m.media-amazon.com/images/I/61ivW0hJaKL._MCnd_AC_UL320_.jpg'
                        price={36500}
                        rating={3} 
                    />
                    <Product
                        id={10}
                        title="product7"
                        image='https://m.media-amazon.com/images/I/51YGdPjQZCL._MCnd_AC_UL320_.jpg'
                        price={53000}
                        rating={2} 
                    />
                    <Product
                        id={11}
                        title="product8"
                        image='https://m.media-amazon.com/images/I/71pEBW63mbS._MCnd_AC_UL320_.jpg'
                        price={34800}
                        rating={4} 
                    />
                </div>
                <div className="home_row_ver2">
                    {/* <Slider tag = "long_con"/> */}
                    <div className="ver2_inner">
                        {/* <p>Highly Recommended item</p> */}
                        <Slider tag = "long_con"/>
                    </div>
                </div>
                <div className="home_row_ver3">
                    <div className="ver3_inner">

                    </div>
                    <div className="ver3_inner">
                        
                    </div>
                    <div className="ver3_inner">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;