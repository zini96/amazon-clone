import React from 'react';
import {Link} from "react-router-dom"
import './Header.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useStateValue } from '../StateProvider/StateProvider';
import { auth } from '../firebase & axios/firebase';
import Findadd from '../Findadd/Findadd';



function Header() {
    const [{basket, user}, dispatch] = useStateValue();
    //basket의 length를 가져와서 장바구니 숫자를 변경해주기위해
    const handleAuthentication = ()=>{
        if(user){
            auth.signOut();
        }
    };
    const username = (user?.email||'').split('@');
    // console.log(username[0]);

    return (
        <div className='header'>
            <Link to="/">
                <img className='header_logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'/>
            </Link>

            <div className='header_deliver'>
                <div className='header_deliver_option'>
                    <span className='header_optionLineOne'>Deliver to</span>
                    <span className='header_optionLineTwo'>
                        <FmdGoodOutlinedIcon className='header_deliverIcon'/>
                        <Findadd/>
                    </span>
                </div>
            </div>

            <div className='header_search'>
                <input className='header_searchInput' type="text"/>
                <SearchOutlinedIcon className='header_searchIcon'/>
            </div>

            <div className='header_nav'>    
                <div className='header_option' id='userlogin' onClick={handleAuthentication} >
                    <Link to={!user && "/login"} className='login_link'>
                        <span className='header_optionLineOne'>Hello, {user ? username[0] : "Guest"}</span><br/>
                        <span className='header_optionLineTwo'>{user ? "SignOut" : "SignIn"}</span>
                    </Link>                    
                </div>
                <div className='header_option'>
                    <Link to="/orders" className='order_link'>
                        <span className='header_optionLineOne'>Returns</span>
                        <span className='header_optionLineTwo'>Orders</span>
                    </Link>  
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingCartOutlinedIcon className='header_optionBasketIcon'  />
                        <span className='header_optionBasket_count'>
                            {basket?.length}
                        </span>
                        <span className='header_optionBasket_txt'>Cart</span>
                    </div>
                </Link>
            </div>

        </div>
        
    );
}

export default Header;