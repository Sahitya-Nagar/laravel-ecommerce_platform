import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/mens/six.jpg'
import { CartContext } from './context/Cart'
import { Button } from 'react-bootstrap'

const Cart = () => {

    const {cartData,grandTotal,shipping,subTotal,updateCartItem,deleteCartItem} = useContext(CartContext)

    const [qty,setQty] = useState([])

    const handleQty = (e, itemId) => {
        const newQty = e.target.value
        setQty(prev => ({...prev, [itemId]: newQty}))
        updateCartItem(itemId, newQty)
    }

  return (
    <Layout>
        <div className='container pb-5'>
            <div className='row'>
                    <div className='col-md-12'>
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Cart</li>
                            </ol>
                         </nav>
                    </div>

                    <div className='col-md-12'>
                        <h2 className='border-bottom pb-3'>Cart</h2>
                        <table className='table'>
                            <tbody>
                                {
                                    cartData.length == 0 && 
                                    <tr>
                                        <td align='center' valign='middle' colSpan={4} style={{height: 200}}>Your Cart is Empty</td>
                                    </tr>
                                }
                                {   
                                    cartData && cartData.map(item => {
                                        return(
                                            <tr key={`${item.id}`}>
                                                <td width={100}>
                                                    <img src={item.image_url} width={80} alt="" />
                                                </td>
                                                <td width={600}> 
                                                    <h4> {item.title}</h4>
                                                    <div className='d-flex align-items-center pt-3'>
                                                            <span>₹{item.price}</span>
                                                            <div className='ps-3'>
                                                                {
                                                                    item.size &&  <button className='btn btn-size'>{item.size}</button>     
                                                                }
                                                            </div> 
                                                    </div>
                                                </td>

                                                <td valign="middle">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <Button 
                                                            className="btn btn-secondary" 
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '50%',
                                                                fontSize: '18px',
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                            onClick={() => {
                                                                if ((qty[item.id] || item.qty) > 1) {
                                                                    handleQty({ target: { value: (qty[item.id] || item.qty) - 1 } }, item.id);
                                                                }
                                                            }}
                                                        >
                                                            -
                                                        </Button>

                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                                                            {qty[item.id] || item.qty}
                                                        </span>

                                                        <Button 
                                                            className="btn btn-secondary"  
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '50%',
                                                                fontSize: '18px',
                                                                fontWeight: 'bold',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                            onClick={() => {
                                                                if ((qty[item.id] || item.qty) < 10) {
                                                                    handleQty({ target: { value: (qty[item.id] || item.qty) + 1 } }, item.id);
                                                                }
                                                            }}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </td>

                                                
                                                <td valign='middle'>
                                                    <a href="#" onClick={() => deleteCartItem(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                                    </svg>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            
                {
                cartData.length > 0 &&     
                <div className='row justify-content-end'>

                    <div className='col-md-3'>
                        <div className='d-flex justify-content-between border-bottom pb-2'>
                            <div>Subtotal</div>
                            <div>₹{subTotal()}</div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <div>Shipping</div>
                            <div>₹{shipping()}</div>
                        </div>

                        <div className='d-flex justify-content-between border-bottom py2'>
                            <div><strong>Grand Total</strong></div>
                            <div>₹{grandTotal( )}</div>
                        </div>

                        <div className='d-flex justify-content-end py-3'>
                            <Link to='/checkout'>
                            <button className='btn btn-primary'>Proceed To Checkout</button>
                            </Link>
                        </div>
                </div>
                
             

                </div>
                }
            </div> 
             
        </div>
    </Layout>
  )
}

export default Cart
