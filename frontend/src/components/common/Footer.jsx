// import React, { useContext, useEffect, useState } from 'react';
// import LogoBlack from '../../assets/images/logoFinal.jpg'
// import { Link } from 'react-router-dom';
// import { apiUrl } from './http';

// const Footer = () => {
//   const [categories, setCategories] = useState([]);
//   // Add state for form fields
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const fetchCategories = () => {
//     fetch(`${apiUrl}/get-categories`, {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json',
//         'Accept': 'application/json'
//       }
//     })
//       .then(res => res.json())
//       .then(result => {
//         if (result.status === 200) {
//           setCategories(result.data);
//         } else {
//           console.log("Something Went wrong");
//         }
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({
//       name: '',
//       email: '',
//       message: ''
//     });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <footer className='py-5 text-white'>
//       <div className='container'>
//         <div className='row mb-5'>
//           <div className='col-md-3 pb-4'>
//             <img src={LogoBlack} alt="" width={100} height={100} />
//             <div className='pt-3 pe-5'>Le Lorem Ipsum est le faux texte standard </div>
//           </div>

//           <div className='col-md-3 pb-4'>
//             <h2 className='mb-3'>Categories</h2>
//             <ul>
//               {categories.map(category => (
//                 <li key={`cat-${category.id}`}>
//                   <Link to={`/shop?category=${category.id}`} className='clk'>
//                     {category.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className='col-md-3 pb-4'>
//             <h2 className='mb-3'>Quick Links</h2>
//             <ul>
//               <li>
//                 <Link to="/account/login" className='clk'>Login</Link>
//               </li>
//               <li>
//                 <Link to="/account/register" className='clk'>Register</Link>
//               </li>
//             </ul>
//           </div>

//           <div className='col-md-3'>
//             <h2 className='mb-3'>Get in Touch</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Your Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Your Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <textarea
//                   className="form-control"
//                   placeholder="Your Message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   rows="3"
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary w-100">Send Message</button>
//             </form>
//           </div>
//         </div>

//         <div className='row spotlight py-5'>
//           <div className='col-md-4'>
//             <div className='d-flex justify-content-center py-3'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
//                 <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
//               </svg>
//               <h3 className='ps-2'>Free Delivery</h3>
//             </div>
//           </div>

//           <div className='col-md-4'>
//             <div className='d-flex justify-content-center py-3'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
//                 <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
//                 <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path>
//               </svg>
//               <h3 className='ps-2'>Money Back Guarantee</h3>
//             </div>
//           </div>

//           <div className='col-md-4'>
//             <div className='d-flex justify-content-center py-3'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
//                 <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
//                 <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
//               </svg>
//               <h3 className='ps-2'>Secure Payments</h3>
//             </div>
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-md-12 text-center pt-5'>
//             <p>© 2024 All Right Reserved</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useContext, useEffect, useState } from 'react';
import LogoBlack from '../../assets/images/logoFinal.jpg';
import { Link } from 'react-router-dom';
import { apiUrl } from './http';
import emailjs from '@emailjs/browser'; 

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // Optional: To show success/error messages

  const fetchCategories = () => {
    fetch(`${apiUrl}/get-categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          setCategories(result.data);
        } else {
          console.log("Something Went wrong");
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS send function
    emailjs.send(
      'service_444oeqt', // Replace with your EmailJS Service ID
      'template_btf1oif', // Replace with your EmailJS Template ID
      formData, // The form data object matches the template variables
      '8bxFIcrtCUJvCIc9g' // Replace with your EmailJS Public Key
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }, (error) => {
        console.log('Email sending failed:', error.text);
        setStatus('Failed to send message. Please try again.');
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <footer className='py-5 text-white'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-md-3 pb-4'>
            <img src={LogoBlack} alt="" width={100} height={100} />
            <div className='pt-3 pe-5'>Le Lorem Ipsum est le faux texte standard </div>
          </div>

          <div className='col-md-3 pb-4'>
            <h2 className='mb-3'>Categories</h2>
            <ul>
              {categories.map(category => (
                <li key={`cat-${category.id}`}>
                  <Link to={`/shop?category=${category.id}`} className='clk'>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-md-3 pb-4'>
            <h2 className='mb-3'>Quick Links</h2>
            <ul>
              <li>
                <Link to="/account/login" className='clk'>Login</Link>
              </li>
              <li>
                <Link to="/account/register" className='clk'>Register</Link>
              </li>
            </ul>
          </div>

          <div className='col-md-3'>
            <h2 className='mb-3'>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
              {status && <p className="mt-2">{status}</p>} {/* Optional status message */}
            </form>
          </div>
        </div>

        {/* Rest of your footer code remains unchanged */}
        <div className='row spotlight py-5'>
          <div className='col-md-4'>
            <div className='d-flex justify-content-center py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
              </svg>
              <h3 className='ps-2'>Free Delivery</h3>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='d-flex justify-content-center py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path>
              </svg>
              <h3 className='ps-2'>Money Back Guarantee</h3>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='d-flex justify-content-center py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
              </svg>
              <h3 className='ps-2'>Secure Payments</h3>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12 text-center pt-5'>
            <p>© 2024 All Right Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;