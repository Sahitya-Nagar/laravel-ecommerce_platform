import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../common/http";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartData , setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const [shippingCost, setShippingCost] = useState(0)

    const shipping = () => {

        let shippingAmount = 0
        cartData.map(item => {
            shippingAmount += item.qty * shippingCost
        })

        return shippingAmount
    }

    const subTotal = () => {
        let subtotal = 0
        cartData.map(item => {
            subtotal += item.qty * item.price
        })

        return subtotal
    }

    const grandTotal = () => {
        return subTotal() + shipping()
    }

    const addToCart = (product, size=null) => {
        let updatedCart = [ ...cartData]

        //If cart is empty
        if(cartData.length == 0){
            updatedCart.push({
                id : `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id : product.id,
                size : size,
                title : product.title,
                price: product.price,
                qty : 1,
                image_url : product.image_url
            })
        }else{
            //if size is not empty
            if(size != null){
                const isProductExist = updatedCart.find(item => 
                    item.product_id == product.id && item.size == size
                )

            //if product and size combination exits then increase qty
                if(isProductExist){
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id && item.size == size)
                        ?{...item, qty: item.qty + 1}
                        :item
                    )
                }else{
                    //if product and size combination not exits then add new item
                    updatedCart.push({
                        id : `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id : product.id,
                        size : size,
                        title : product.title,
                        price: product.price,
                        qty : 1,
                        image_url : product.image_url
                    })
                }
            }else{
                //when size is null
                const isProductExist = updatedCart.find(item => 
                    item.product_id == product.id 
                )

                if(isProductExist){
                    //when product found in cart then increase qty
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id)
                        ?{...item, qty: item.qty + 1}
                        :item
                    )
                }else{
                    //if product not exits then add new item
                    updatedCart.push({
                        id : `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id : product.id,
                        size : size,
                        title : product.title,
                        price: product.price,
                        qty : 1,
                        image_url : product.image_url
                    })
                }
            }
        }

        setCartData(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }

    const updateCartItem = (itemId,newQty) => {
        let updatedCart = [...cartData]
        updatedCart = updatedCart.map(item => 
            (item.id == itemId) ? {...item, qty: newQty} : item
        )
        setCartData(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }

    const deleteCartItem = (itemId) => {
       const newCartData = cartData.filter(item => item.id != itemId)
       setCartData(newCartData)
       localStorage.setItem('cart',JSON.stringify(newCartData))
       toast.success("Product from cart removed successfully")
    }

    const getQty = () => {
        let qty =0
        cartData.map(item => {
            qty += parseInt(item.qty)
        })
        return qty
    }

    useEffect(() => {
        fetch(`${apiUrl}/get-shipping-front`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => res.json())
        .then(result => {

            if (result.status == 200) {
                setShippingCost(result.data.shipping_charge)
            } else {
                setShippingCost(0)
                toast.error(result.message || "Something went wrong!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            toast.error("Failed to save category. Please try again.");
            setDisable(false);
        });
    })


    return(
        <CartContext.Provider value={{ addToCart,cartData,grandTotal,shipping,subTotal,updateCartItem,deleteCartItem,getQty }}>
            {children}
        </CartContext.Provider>
    )
}