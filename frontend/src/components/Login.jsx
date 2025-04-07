import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiUrl } from './common/http';
import { AuthContext } from './context/Auth';
import { toast } from 'react-toastify';
import Layout from './common/Layout';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.status === 200) {
                const userInfo = { token: result.token, id: result.id, name: result.name };
                login(userInfo);
                navigate(`/account/${result.id}`);
                toast.success("Login Successful!");
            } else {
                toast.error(result.message || "Login failed.");
            }
        } catch (error) {
            toast.error("An error occurred.");
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="container d-flex justify-content-center py-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card shadow border-8 login">
                        <div className="card-body p-4">
                            <h3 className="border-bottom mb-3 pb-3">Login</h3>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                                    })}
                                    type="text"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                />
                                {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    {...register('password', { required: "Password is required" })}
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                />
                                {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
                            </div>
                            <button type="submit" className="btn btn-secondary w-100">Login</button>
                            <div className="d-flex justify-content-center pt-4 pb-2">
                                Don't have an account? <Link to="/account/register" className='clk'>Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;