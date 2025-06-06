import React, { useContext } from 'react';
import Layout from '../common/Layout';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/http';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
  const { login } = useContext(AdminAuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === 200) {
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };

        // Update Context and Local Storage
        await login(adminInfo);
        toast.success("Login Successful!");
        navigate('/admin/dashboard');
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <Layout>
      <div className='container d-flex justify-content-center py-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='card shadow border-8 login'>
            <div className='card-body p-4'>
              <h3>Admin Login</h3>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                  {...register('email', {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  placeholder='Email'
                />
                {errors.email && (
                  <p className='invalid-feedback'>{errors.email.message}</p>
                )}
              </div>

              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                  {...register('password', {
                    required: "The password field is required.",
                  })}
                  type="password"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  placeholder='Password'
                />
                {errors.password && (
                  <p className='invalid-feedback'>{errors.password.message}</p>
                )}
              </div>

              <button className='btn btn-secondary' type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
