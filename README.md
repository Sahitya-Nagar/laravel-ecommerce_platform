# 🛒 E-Commerce Platform (Laravel + React)

This is a full-featured e-commerce platform developed during my internship at **Sinelogix Technology**, Vadodara. The platform uses **Laravel** for the backend and **React.js** for the frontend, with a focus on secure authentication, dynamic product management, and a responsive UI for both desktop and mobile users.

---

## 🚀 Features

- 🔐 User Authentication (JWT + Role-Based Access Control)
- 🛍️ Product Management (Admin: Add/Edit/Delete Products)
- 🛒 Shopping Cart and Checkout Functionality
- 📦 Order Tracking and Status Updates
- 💰 Cash on Delivery (COD) Payment Support
- 📊 Admin Dashboard with Analytics and Control Panel
- 🔎 Search and Filtering by categories, brands, and keywords
- 📱 Fully Responsive Design (Mobile & Desktop)

---

## 🧱 Tech Stack

- **Frontend:** React.js, Bootstrap, Axios
- **Backend:** Laravel 10 (PHP), RESTful API
- **Database:** MySQL
- **Authentication:** JWT, Laravel Sanctum
- **Version Control:** Git & GitHub
- **Tools Used:** Postman, VS Code, Git, phpMyAdmin

---

## 📁 Folder Structure

/client
  └── src
      └── components    # Reusable UI components (e.g., Navbar, ProductCard)
      └── pages         # Full pages (e.g., Home, ProductList, Cart)
      └── services      # API calls (e.g., using Axios to connect with Laravel API)
      
/server
  └── app              # Contains Models, Services, etc.
  └── routes/api.php   # Where all the API routes are defined (e.g., /api/products)
  └── controllers      # Logic for each route (e.g., ProductController, AuthController)
  
/public
  └── index.php        # Laravel's entry point
  └── assets/          # Any public assets

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Installation Guide

```bash
Backend (Laravel)
cd server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Frontend (React)
cd client
npm install
npm start
```
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🔐 Security Features
JWT-based user authentication

Bcrypt password hashing

CSRF token protection

SQL injection prevention using prepared statements

Role-Based Access Control (Admin, Customer)

## 🧪 Testing & Optimization
✅ Tested API endpoints using Postman

✅ Manual functional testing for frontend features

✅ Responsive design testing on mobile and desktop

✅ Indexed database tables and optimized SQL queries

✅ Minified CSS/JS for performance improvement

## 🔮 Future Enhancements
🤖 AI-Based Product Recommendations

🚚 Real-Time Order Tracking

📈 Advanced Analytics Dashboard for Admin

📱 Mobile App Integration

🌐 Multi-Language Support

🔎 Enhanced AI Search with Suggestions

## 📌 Challenges & Solutions
Database Optimization: Used indexing and Eloquent eager loading.

Secure Authentication: Implemented JWT with Laravel Sanctum.

Cross-Browser Issues: Conducted UI testing on multiple browsers.

Handling Scale: Optimized API calls and backend structure.

## 🙋‍♂️ Author
Sahitya Nagar
📧 Email: sahityanagar12@gmail.com
🌐 LinkedIn: https://www.linkedin.com/in/sahitya-nagar-039603228/


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Let me know if you want to include images, a live demo link, or want the file exported as `.md` format!





