import React, { useState, useEffect, useRef } from "react";
import './Slider.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TOTAL_SLIDES = 4;

const Slide = ({image, tag})=>{
    if( tag === "Top"){
        return <img className="img_slide" src={image}/>
    }else if(tag === "long_con"){
        return <img className="img_slide_2" src={image}/>
    }
};

function Slider({tag}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    
    if(tag === "Top"){
        return (
            <div className="slide_container">
                <div className="slide_innercon" ref={slideRef}>
                    <Slide image='https://m.media-amazon.com/images/I/61Ew2L5n2+L._SX3000_.jpg' tag="Top"/>
                    <Slide image='https://m.media-amazon.com/images/I/51PG7WjcL7L._SX1500_.jpg' tag="Top"/>
                    <Slide image='https://m.media-amazon.com/images/I/71z8youNyRL._SX3000_.jpg' tag="Top"/>
                    <Slide image='https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg' tag="Top"/>
                    <Slide image='https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg' tag="Top"/>
                </div>
                <button className="slide_btn" id="pre" onClick={prevSlide}><ArrowBackIosIcon/></button>
                <button className="slide_btn" id="next" onClick={nextSlide}><ArrowForwardIosIcon/></button>
            </div>
        );
    }else if(tag === "long_con"){
        return (
            <div className="slide_container" id="slide_container_2">
                <div className="slide_innercon" ref={slideRef}>
                    <Slide image='./11.png' tag="long_con"/>
                    <Slide image='./22.png' tag="long_con"/>
                    <Slide image='./33.png' tag="long_con"/>
                    <Slide image='./44.png' tag="long_con"/>
                    <Slide image='./55.png' tag="long_con"/>
                </div>
                <button className="slide_btn_2" id="pre" onClick={prevSlide}/>
                <button className="slide_btn_2" id="next" onClick={nextSlide}/>
            </div>
        );
    }

}
export default Slider;