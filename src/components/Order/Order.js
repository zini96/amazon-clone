import React from 'react';
import './Order.css'
import moment from 'moment';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider/StateProvider';

function Order({order}) {
    const [{address, user}, dispatch] = useStateValue();
    // console.log(address);

    return (
        <div className='order'>
            <div className='order_text'>
                <h2>Order</h2>
                <div className='order_text_1'>
                    <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
                    <p className='order_id'>
                        <small>{order.id}</small>
                    </p>
                </div>
            </div>


            {order.data.basket?.map(item => (
                <CheckoutProduct 
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}

            <CurrencyFormat
                renderText={(value) => (
                    <h3 className='order_total'>
                        Order total : {value}
                    </h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₩ "}
            />

        </div>
    );
}

export default Order;