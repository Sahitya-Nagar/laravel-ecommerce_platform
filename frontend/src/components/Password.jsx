import React, { useEffect, useState } from 'react';
import Layout from './common/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import UserSidebar from './common/UserSidebar';
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from './common/http';
import { toast } from 'react-toastify';

const Password = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser();
  }, [id]); // Runs only when `id` changes

  const fetchUser = async () => {
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
      if (result.status === 200) {
        setUser(result.data);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updatePassword = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/password/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken()}`
        },
        body: JSON.stringify({
          old_password: data.currentPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmPassword 
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Password updated successfully!");
        reset(); 
      
        // Redirect to login page instead of home
        navigate('/account/login');
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  
    setLoading(false);
  };
  

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-5 pb-3'>
            <h4 className='h4 pb-0 mb-0'>Change Password</h4>
          </div>

          <div className='col-md-3'>
            <UserSidebar />
          </div>

          <div className='col-md-9 mb-5'>
            <div className='card shadow'>
              <div className='card-body p-4'>
                <form onSubmit={handleSubmit(updatePassword)}>
                  <div className='mb-3'>
                    <label className='form-label'>Current Password</label>
                    <input
                      type='password'
                      {...register("currentPassword", { required: "Current password is required" })}
                      className='form-control'
                    />
                    {errors.currentPassword && <p className='text-danger small'>{errors.currentPassword.message}</p>}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>New Password</label>
                    <input
                      type='password'
                      {...register("newPassword", {
                      required: "New password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                      className='form-control'
                    />
                    {errors.newPassword && <p className='text-danger small'>{errors.newPassword.message}</p>}
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Confirm New Password</label>
                    <input
                      type='password'
                      {...register("confirmPassword", {
                        validate: value => value === watch("newPassword") || "Passwords do not match"
                      })}
                      className='form-control'
                    />
                    {errors.confirmPassword && <p className='text-danger small'>{errors.confirmPassword.message}</p>}
                  </div>

                  <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                    {loading ? "Updating..." : "Change Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Password;
