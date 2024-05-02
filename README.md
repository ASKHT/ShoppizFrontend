# MERN E-Commerce App

This is a full-stack e-commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to browse products, add them to cart or wishlist, make payments using Razorpay, manage user profiles, and write reviews for purchased products.

## Features

- **User Authentication**: Sign up, log in, and log out securely.
- **Product Management**: Admins can manage products (add, edit, delete).
- **Shopping Cart**: Add products to cart, adjust quantities, and proceed to checkout.
- **Wishlist**: Save favorite products for future reference.
- **Payment Processing**: Integrated with Razorpay for secure payments.
- **User Profile**: View and edit user profile information.
- **Order History**: View past orders and their status.
- **Product Reviews**: Write reviews for purchased products.

## Technologies Used

- **Frontend**: React.js, Redux, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Razorpay

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/ASKHT/mern-ecommerce.git

cd mern-ecommerce
cd frontend
npm install
cd ..
cd backend
npm install
## env variable setup
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
jwtsecret=your_secret

##1 how to run backend
cd backend
npm start
## 2 how to run frontend
cd frontend
npm start
