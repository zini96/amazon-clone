import React, {useEffect, useState} from 'react';
import { db } from '../firebase & axios/firebase';
import './Orders.css';
import { useStateValue } from '../StateProvider/StateProvider';
import Order from './Order';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from 'react-router-dom';

function Orders() {
    const [{basket, user,address}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    
    useEffect(()=>{
        if(user){
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                ))
        }else{
            setOrders([])
        }
    },[user])

    return (
        <div className='orders'>
            <div className='orders_con'>
                <div className="payment_topImg">
                    <div className='div1'>
                        <img className='header_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
                        <hr id='hr1'/>
                        <hr id='hr3'/><br/>
                        <ShoppingCartOutlinedIcon id='icon4'/>
                    </div>
                    <div className='div2'>
                        <p>SIGN IN</p>
                        <p>SHIPPING & PAYMENT</p>
                        <p>PLACE ORDER</p>
                    </div>
                </div>

                <h1>Your Orders</h1>
                {user? 
                    <div className='orders_order'>
                        {orders?.map(order => (
                            <Order order={order}/>
                        ))}
                    </div>
                :   <div className='orders_order_2'>
                        This service is only available to users who have signed up.<br/>
                        Create your Amazone account <br/>
                        <Link to="/login">
                            <button className='gologin_btn'>SIGN UP</button>
                        </Link>
                    </div>
                }
            </div>
            
        </div>
    );
}

export default Orders