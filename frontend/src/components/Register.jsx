// import React from 'react'
// import Layout from './common/Layout'
// import Sidebar from './common/Sidebar'
// import { Link, useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'
// import { apiUrl } from './common/http'

// const Register = () => {

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()

//     const navigate = useNavigate();

//     const onSubmit = async (data) => {
   
//         const res = await fetch(`${apiUrl}/register`,{
//             method: 'POST',
//             headers:{
//                 'Content-type' : 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(res => res.json())
//         .then(result => {
//             console.log(result)

//             if(result.status ==200){
//                 toast.success(result.message || "Product created successfully!")
//                 navigate('/account/login')
//             } else{
//                 //toast.error(result.message)
//                 //Below method is for if user data already exists in db
//                 const formErrors = result.errors;
//                 Object.keys(formErrors).forEach((field) => {
//                 setError(field, {message: formErrors[field][0]});
//               })
//             }
//         })
//     }


//   return (
//     <Layout>
//         <div className='container d-flex justify-content-center py-5'>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className='card shadow border-8 login'>
//                     <div className='card-body p-4'>

//                         <h3 className='border-bottom mb-3 pb-3'>Register</h3>

//                         <div className='mb-3'>
//                             <label htmlFor="" className='form-label'>Name</label>
//                             <input 
//                             {
//                                 ...register('name',{
//                                     required: "The name field is required",                
//                                 })
//                             }
//                             type="text" 
//                             className={`form-control ${errors.name && 'is-invalid'}`} 
//                             placeholder='Name' />
//                             {
//                                 errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
//                             }
//                         </div>

//                         <div className='mb-3'>
//                             <label htmlFor="" className='form-label'>Email</label>
//                             <input 
//                             {
//                                 ...register('email',{
//                                     required: "The email field is required",
//                                     pattern: {
//                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                         message: "Invalid email address"
//                                     } 
//                                 })
//                             }
//                             type="text" 
//                             className={`form-control ${errors.email && 'is-invalid'}`} 
//                             placeholder='Email' />
//                             {
//                                 errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
//                             }
//                         </div>

//                         <div className='mb-3'>
//                             <label htmlFor="" className='form-label'>Password</label>
//                             <input 
//                             {
//                                 ...register("password",{
//                                     required: "The password field is required."
//                                 })
//                             }
//                             type="password"
//                             className={`form-control ${errors.password && 'is-invalid'}`}
//                             placeholder='Password' />
//                             {
//                                 errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
//                             }
//                         </div>
//                         <button className='btn btn-secondary w-100'>Register</button>

//                         <div className='d-flex justify-content-center pt-4 pb-2'>
//                             Already have an account? &nbsp;<Link to="/account/login" className='clk'>Login</Link>
//                         </div>
//                     </div>
//                 </div>
//             </form>     
//         </div>
//     </Layout>
//   )
// }

// export default Register

import React from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiUrl } from './common/http'

const Register = () => {
    const {
        register,
        handleSubmit,
        setError,  // Add setError to the destructured useForm hook
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await res.json();

            if (result.status === 200) {
                toast.success(result.message || "Product created successfully!");
                navigate('/account/login');
            } else {
                // Handle server-side errors
                if (result.errors) {
                    const formErrors = result.errors;
                    // Show all errors via toast
                    Object.values(formErrors).forEach(errorArray => {
                        toast.error(errorArray[0]);  // Show the first error message for each field
                    });
                    // Still set form errors for field-specific display
                    Object.keys(formErrors).forEach((field) => {
                        setError(field, { message: formErrors[field][0] });
                    });
                } else {
                    // Generic error message if no specific errors provided
                    toast.error(result.message || "Registration failed");
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        }
    }

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card shadow border-8 login'>
                        <div className='card-body p-4'>
                            <h3 className='border-bottom mb-3 pb-3'>Register</h3>

                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Name</label>
                                <input 
                                    {...register('name', {
                                        required: "The name field is required",                
                                    })}
                                    type="text" 
                                    className={`form-control ${errors.name && 'is-invalid'}`} 
                                    placeholder='Name' />
                                {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Email</label>
                                <input 
                                    {...register('email', {
                                        required: "The email field is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        } 
                                    })}
                                    type="text" 
                                    className={`form-control ${errors.email && 'is-invalid'}`} 
                                    placeholder='Email' />
                                {errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>}
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="" className='form-label'>Password</label>
                                <input 
                                    {...register("password", {
                                        required: "The password field is required."
                                    })}
                                    type="password"
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    placeholder='Password' />
                                    {errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>}
                            </div>
                            <button className='btn btn-secondary w-100'>Register</button>

                            <div className='d-flex justify-content-center pt-4 pb-2'>
                                Already have an account?  <Link to="/account/login" className='clk'>Login</Link>
                            </div>
                        </div>
                    </div>
                </form>     
            </div>
        </Layout>
    )
}

export default Register