import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';


const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const PlaceOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })

    }

    return (
        <form onSubmit={placeholder} className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input name='firstname' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First Name' />
                    <input name='lastname' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last Name' />
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email Address' />
                <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
                <div className='multi-fields'>
                    <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
                    <input name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip Code' />
                    <input name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' /> {/* This input was misplaced */}
            </div>

            <div className='place-order-right'>
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() == 0 ? 0 : 2}</p>

                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>

                    </div>
                    <button type='submit' >PROCEED TO PAYMENT</button>
                </div>
                {/* Add any content or form elements needed here */}
            </div>
        </form>
    );
};

export default PlaceOrder;
