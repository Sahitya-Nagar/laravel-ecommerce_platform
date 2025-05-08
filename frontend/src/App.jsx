// import { useState } from 'react'
// import { BrowserRouter,Route, Routes, useParams } from 'react-router-dom'
// import Home from './components/home';
// import Shop from './components/shop'
// import Product from './components/Product'
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import Login from './components/admin/Login';
// import { ToastContainer, toast } from 'react-toastify';
// import Dashboard from './components/admin/Dashboard';
// import { AdminRequireAuth } from './components/admin/AdminRequireAuth';

// import {default as ShowCategories} from './components/admin/category/show';
// import {default as CreateCategories} from './components/admin/category/Create';
// import {default as EditCategories} from './components/admin/category/Edit';

// import {default as ShowBrands} from './components/admin/brand/Show';
// import {default as CreateBrands} from './components/admin/brand/Create';
// import {default as EditBrands} from './components/admin/brand/Edit';

// import {default as ShowProducts} from './components/admin/product/Show';
// import {default as CreateProducts} from './components/admin/product/Create';
// import {default as EditProducts} from './components/admin/product/Edit';
// import Register from './components/Register';
// import  {default as UserLogin} from './components/Login';
// import Profile from './components/Profile';
// import { RequireAuth } from './components/RequiredAuth';
// import Order from './components/admin/Order';
// import Confirmation from './components/Confirmation';
// import Password from './components/Password';
// import Shipping from './components/admin/Shipping';
// import Items from './components/admin/Charges';
// import Users from './components/admin/Users';
// import UserOrder from './components/UserOrder';
// import {default as ChangePassword} from './components/admin/Password';
// import Charges from './components/admin/Charges';


// function App() {

//   const {id} = useParams()

//   return (
//    <>
//       <ToastContainer />

//       <BrowserRouter>
//         <Routes>
//           {/* User Routes */}
//           <Route path='/' element={<Home/>} />
//           <Route path='/shop' element={<Shop/>} />
//           <Route path='/product/:id' element={<Product/>} />
//           <Route path='/cart' element={<Cart/>} />
//           {/* <Route path='/checkout' element={<Checkout/>} /> */}
//           <Route path='/account/register' element={<Register/>} />
//           <Route path='/account/login' element={<UserLogin/>} />
       
//           <Route path='/account/:id' element={
//               <RequireAuth>
//                 <Profile/>
//               </RequireAuth>
//           } />

//           <Route path='/order/:id' element={
//               <RequireAuth>
//                 <UserOrder/>
//               </RequireAuth>
//           } />

//           <Route path='/password/:id' element={
//               <RequireAuth>
//                 <Password/>
//               </RequireAuth>
//           } />

//           <Route path='/checkout' element={
//               <RequireAuth>
//                 <Checkout/>
//               </RequireAuth>
//           } />

//           <Route path='/order/confirmation/:id' element={
//               <RequireAuth>
//                 <Confirmation/>
//               </RequireAuth>
//           } />

//           <Route path='/order/confirmation/:id' element={
//               <RequireAuth>
//                 <Confirmation/>
//               </RequireAuth>
//           } />
          
//           {/* Admin Routes */}
//           <Route path='/admin/login' element={<Login/>} />

//           <Route path='/admin/dashboard' element={
//               <AdminRequireAuth>
//                 <Dashboard/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/categories' element={
//               <AdminRequireAuth>
//                 <ShowCategories/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/categories/create' element={
//               <AdminRequireAuth>
//                 <CreateCategories/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/categories/edit/:id' element={
//               <AdminRequireAuth>
//                 <EditCategories/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/brands' element={
//               <AdminRequireAuth>
//                 <ShowBrands/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/brands/create' element={
//               <AdminRequireAuth>
//                 <CreateBrands/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/brands/edit/:id' element={
//               <AdminRequireAuth>
//                 <EditBrands/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/products' element={
//               <AdminRequireAuth>
//                 <ShowProducts/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/products/create' element={
//               <AdminRequireAuth>
//                 <CreateProducts/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/products/edit/:id' element={
//               <AdminRequireAuth>
//                 <EditProducts/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/orders' element={
//               <AdminRequireAuth>
//                 <Order/>
//               </AdminRequireAuth>
//           } />
          
//           <Route path='/admin/shipping/:id' element={
//               <AdminRequireAuth>
//                 <Shipping/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/shipping' element={
//               <AdminRequireAuth>
//                 <Charges/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/users' element={
//               <AdminRequireAuth>
//                 <Users/>
//               </AdminRequireAuth>
//           } />

//           <Route path='/admin/change-password' element={
//               <AdminRequireAuth>
//                 <ChangePassword/>
//               </AdminRequireAuth>
//           } />

//         </Routes>
//       </BrowserRouter>
//    </>
     
//   )
// }


// export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './components/home';
import Shop from './components/shop';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/admin/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/admin/Dashboard';
import { AdminRequireAuth } from './components/admin/AdminRequireAuth';
import ShowCategories from './components/admin/category/show';
import CreateCategories from './components/admin/category/Create';
import EditCategories from './components/admin/category/Edit';
import ShowBrands from './components/admin/brand/Show';
import CreateBrands from './components/admin/brand/Create';
import EditBrands from './components/admin/brand/Edit';
import ShowProducts from './components/admin/product/Show';
import CreateProducts from './components/admin/product/Create';
import EditProducts from './components/admin/product/Edit';
import Register from './components/Register';
import UserLogin from './components/Login';
import Profile from './components/Profile';
import { RequireAuth } from './components/RequiredAuth';
import Order from './components/admin/Order';
import Confirmation from './components/Confirmation';
import Password from './components/Password';
import Shipping from './components/admin/Shipping';
import Charges from './components/admin/Charges';
import Users from './components/admin/Users';
import UserOrder from './components/UserOrder';
import ChangePassword from './components/admin/Password';
import { CartProvider } from './components/context/Cart';
import { AuthProvider } from './components/context/Auth';
import { AdminAuthProvider } from './components/context/AdminAuth';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App()  {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <AdminAuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Elements stripe={stripePromise}>
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/account/register" element={<Register />} />
                  <Route path="/account/login" element={<UserLogin />} />
                  <Route
                    path="/account/:id"
                    element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/order/:id"
                    element={
                      <RequireAuth>
                        <UserOrder />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/password/:id"
                    element={
                      <RequireAuth>
                        <Password />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <RequireAuth>
                        <Checkout />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/order/confirmation/:id"
                    element={
                      <RequireAuth>
                        <Confirmation />
                      </RequireAuth>
                    }
                  />
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRequireAuth>
                        <Dashboard />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <AdminRequireAuth>
                        <ShowCategories />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/categories/create"
                    element={
                      <AdminRequireAuth>
                        <CreateCategories />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/categories/edit/:id"
                    element={
                      <AdminRequireAuth>
                        <EditCategories />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/brands"
                    element={
                      <AdminRequireAuth>
                        <ShowBrands />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/brands/create"
                    element={
                      <AdminRequireAuth>
                        <CreateBrands />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/brands/edit/:id"
                    element={
                      <AdminRequireAuth>
                        <EditBrands />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRequireAuth>
                        <ShowProducts />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/products/create"
                    element={
                      <AdminRequireAuth>
                        <CreateProducts />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <AdminRequireAuth>
                        <EditProducts />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRequireAuth>
                        <Order />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/shipping/:id"
                    element={
                      <AdminRequireAuth>
                        <Shipping />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/shipping"
                    element={
                      <AdminRequireAuth>
                        <Charges />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRequireAuth>
                        <Users />
                      </AdminRequireAuth>
                    }
                  />
                  <Route
                    path="/admin/change-password"
                    element={
                      <AdminRequireAuth>
                        <ChangePassword />
                      </AdminRequireAuth>
                    }
                  />
                </Routes>
              </Elements>
            </BrowserRouter>
          </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </>
  );
}

export default App;