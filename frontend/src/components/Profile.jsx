import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import Sidebar from './common/Sidebar'
import UserSidebar from './common/UserSidebar'
import { apiUrl, userToken } from './common/http'
import Loader from './common/Loader'
import Nostate from './common/Nostate'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Profile = () => {

    const [user, setUser] = useState([])
    const { id } = useParams()
    const [loader, setLoader] = useState(true)
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [loadingCities, setLoadingCities] = useState(false)
    
    const {
        register,
        reset,
        handleSubmit,
        watch,
        setError,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            fetch(`${apiUrl}/get-account-detail`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                setLoader(false)
                reset({
                    name: result.data.name,
                    email: result.data.email,
                    address: result.data.address,
                    city: result.data.city,
                    mobile: result.data.mobile,
                    state: result.data.state,
                    zip: result.data.zip,
                })
                setSelectedState(result.data.state)
                // If there's a state value, fetch cities for that state
                if (result.data.state) {
                    fetchCitiesByState(result.data.state)
                }
            })
        }
    })

    // Watch for state changes to fetch cities
    const watchedState = watch('state')
    
    useEffect(() => {
        if (watchedState && watchedState !== selectedState) {
            setSelectedState(watchedState)
            fetchCitiesByState(watchedState)
            // Clear city selection when state changes
            setValue('city', '')
        }
    }, [watchedState])

    // Fetch Indian states from public API
    const fetchStates = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: 'India'
                })
            })
            const result = await response.json()
            if (result.data && result.data.states) {
                setStates(result.data.states)
            }
        } catch (error) {
            console.error("Error fetching states:", error)
        }
    }

    // Fetch cities by state from public API
    const fetchCitiesByState = async (stateName) => {
        setLoadingCities(true)
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: 'India',
                    state: stateName
                })
            })
            const result = await response.json()
            setLoadingCities(false)
            if (result.data) {
                setCities(result.data)
            }
        } catch (error) {
            setLoadingCities(false)
            console.error("Error fetching cities:", error)
            // Fallback in case the API fails for some specific states
            setCities([])
        }
    }

    const updateAccount = async(data) => {
        fetch(`${apiUrl}/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.status == 200)
            {
                toast.success("Profile Updated")
            }
            else{
                const formErrors = result.errors;
                Object.keys(formErrors).forEach((field) => {
                setError(field, {message: formErrors[field][0]});
              })
            }
        });
    }

    const fetchUsers = async () => {
            setLoader(true)
            try {
                const response = await fetch(`${apiUrl}/profile/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${userToken()}`
                    }
                });
                const result = await response.json();
                setLoader(false);

                if (result.status === 200) {
                    setUser(result.data);
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                setLoader(false)
                console.error("Error fetching Account Details:", error);
            }
        };

    useEffect(() => {
        fetchUsers()
        fetchStates()
    }, [id])


  return (
    <Layout>
        <div className='container '>
            <div className='row'>
                <div className='d-flex justify-content-between mt-5 pb-3'>
                    <h4 className='h4 pb-0 mb-0'>My Account</h4>
                </div>

                <div className='col-md-3'>
                    <UserSidebar/>
                </div>
                    <div className='col-md-9'>
                        {
                            loader == true && <Loader/>
                        }
                        {
                            loader == false &&
                        <form onSubmit={handleSubmit(updateAccount)}>
                            <div className='card shadow'>
                                <div className='card-body p-4'>
                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="name" className='form-label'>Name</label>
                                            <input 
                                            {
                                                ...register('name', {required: "The name field is required"})
                                            }
                                            type="text" id='name' 
                                            className={`form-control ${errors.name && 'is-invalid'}`}
                                            placeholder='Enter Name' />
                                            {
                                                errors.name && <p className='text-danger'>{errors.name?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="email" className='form-label'>Email</label>
                                            <input
                                            {
                                                ...register('email',{
                                                    required: "The Email field is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    } 
                                                })
                                            }
                                            type="text" id='email'
                                            className={`form-control ${errors.email && 'is-invalid'}`}
                                            placeholder='Enter Email' />
                                            {
                                                errors.email && <p className='text-danger'>{errors.email?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3'>
                                            <label htmlFor="address" className='form-label'>Address</label>
                                            <textarea
                                            {
                                                ...register('address', {required: "The address field is required"})
                                            }
                                            id="address" placeholder='Enter Address' 
                                            className={`form-control ${errors.address && 'is-invalid'}`}>
                                            </textarea>
                                            {
                                                errors.address && <p className='text-danger'>{errors.address?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="mobile" className='form-label'>Phone</label>
                                            <input 
                                            {
                                                ...register('mobile', {required: "The Phone number field is required"})
                                            }
                                            type="text" id='mobile'
                                            className={`form-control ${errors.mobile && 'is-invalid'}`}
                                            placeholder='Enter Phone number'/>
                                            {
                                                errors.mobile && <p className='text-danger'>{errors.mobile?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="state" className='form-label'>State</label>
                                            <select
                                            {
                                                ...register('state', {required: "The State field is required"})
                                            }
                                            id="state" 
                                            className={`form-select ${errors.state && 'is-invalid'}`}>
                                                <option value="">Select State</option>
                                                {states.map((state, index) => (
                                                    <option key={index} value={state.name}>{state.name}</option>
                                                ))}
                                            </select>
                                            {
                                                errors.state && <p className='text-danger'>{errors.state?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="city" className='form-label'>City</label>
                                            <select
                                            {
                                                ...register('city', {required: "The City field is required"})
                                            }
                                            id="city" 
                                            className={`form-select ${errors.city && 'is-invalid'}`}
                                            disabled={loadingCities || !selectedState}>
                                                <option value="">
                                                    {loadingCities ? 'Loading cities...' : 'Select City'}
                                                </option>
                                                {cities.map((city, index) => (
                                                    <option key={index} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            {
                                                errors.city && <p className='text-danger'>{errors.city?.message}</p>
                                            }
                                        </div>
                                        <div className='mb-3 col-md-6'>
                                            <label htmlFor="zip" className='form-label'>Zip</label>
                                            <input 
                                            {
                                                ...register('zip', {required: "The Zip field is required"})
                                            }
                                            type="text" id='zip' 
                                            className={`form-control ${errors.zip && 'is-invalid'}`}
                                            placeholder='Enter Zip' />
                                            {
                                                errors.zip && <p className='text-danger'>{errors.zip?.message}</p>
                                            }
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <button className='btn btn-primary mt-3 mb-5'>Update</button>
                        </form>
                        }
                    </div>
               

            </div>

        </div>
    </Layout>
  )
}   

export default Profile
