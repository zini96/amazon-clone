import React from 'react';
import './Footer.css'


function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    return (
        <div className='footer'>
            <button className='topback' onClick={scrollToTop}>
                <p>Back to Top</p>
            </button>
            <div className='footer_info'>
                <img className='footer_logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'></img>
                <select className="lang">
                    <option value="">English</option>
                    <option value="ES">español - ES - Traducción</option>
                    <option value="AR">العربية - AR - الترجمة</option>
                    <option value="DE">Deutsch - DE - Übersetzung</option>
                    <option value="HE">עברית - HE - תרגום</option>
                    <option value="KO">한국어 - KO - 번역</option>
                    <option value="PT">português - PT - Tradução</option>
                    <option value="ZH">中文 (简体) - ZH - 翻译</option>
                </select>
                <select className="currency">
                    <option value="USD">$ - USD - US Dollar (Default)</option>
                    <option value="HKD">HK$ - HKD - Hong Kong Dollar</option>
                    <option value="IDR">IDR - Indonesian Rupiah</option>
                    <option value="NZD">NZ$ - NZD - New Zealand Dollar</option>
                    <option value="EUR">€ - EUR - EuroEUR - euro</option>
                    <option value="KRW">₩ - KRW - South Korean Won</option>
                    <option value="JPY">¥ - JPY - Japanese Yen</option>
                    <option value="CNY">CN¥ - CNY - Chinese Yuan</option>
                </select>
                <select className="website">
                    <option value="USA">United States</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="china">China</option>
                    <option value="egypt">Egypt</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="india">India</option>
                    <option value="italy">Italy</option>
                    <option value="japan">Japan</option>
                    <option value="mexico">Mexico</option>
                    <option value="singapor">Singapore</option>
                    <option value="spain">Spain</option>
                    <option value="sweden">Sweden</option>
                    <option value="turkey">Turkey</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="UK">United Kingdom</option>
                    <option value="RoK">Republic of Korea</option>
                </select>
            </div>
            <div className='footer_notice'>
                <p>Conditions of Use Privacy Notice Interest-Based Ads© 1996-2022, Amazon.com, Inc. or its affiliates</p><br/>
                <p>© Copyright 2022. zini96. All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;