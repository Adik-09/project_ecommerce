# 🛒 SnapMart — Full-Stack E-Commerce Platform

<div align="center">

A modern, full-stack e-commerce application built with **React** and **Django REST Framework**, featuring a premium glassmorphism UI, Razorpay payment integration, and Google OAuth authentication.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-0C2451?style=for-the-badge&logo=razorpay&logoColor=white)

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** using `djangorestframework-simplejwt` with access and refresh tokens  
- **Google OAuth 2.0** login/signup — seamless one-click sign-in with Google  
- **User registration & login** with secure password hashing  
- **Profile management** — update personal details and profile picture  

### 🛍️ Product Management
- Browse full product catalog with category filtering  
- Detailed product modal with image, description, price, and stock info  
- Product reviews and ratings system (1–5 stars)  
- Admin product CRUD operations (Create, Read, Update, Delete)  

### 🛒 Shopping Cart
- Add/remove products to cart  
- Update item quantities with real-time price calculation  
- Persistent cart tied to authenticated user  

### 📦 Order Management
- Place orders from cart with delivery address selection  
- Order history with status tracking (`Pending → Confirmed → Shipped → Delivered`)  
- Cancel orders (when status allows)  
- Order items breakdown with individual product details  

### 💳 Payment Integration
- **Razorpay** payment gateway integration  
- Secure order creation and signature verification flow  
- Payment status tracking (`Created → Paid / Failed`)  
- Auto-capture payments with INR currency support  

### 📍 Address Management
- Add and manage multiple delivery addresses  
- Select delivery address during checkout  

### 🎨 Premium UI/UX
- **Glassmorphism** design with frosted-glass effects and smooth gradients  
- **Framer Motion** animations — page transitions, hover effects, and micro-interactions  
- Floating navigation bar with animated active-state pill  
- Responsive layout optimized for desktop  
- Beautiful blurred background with layered overlays  

---

## 🏗️ Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 7, TailwindCSS 4, Framer Motion, Lucide React, Axios      |
| **Backend**  | Django 6.0, Django REST Framework 3.16, SimpleJWT                         |
| **Database** | MySQL 8                                                                    |
| **Payments** | Razorpay (server + client SDK)                                            |
| **Auth**     | JWT (access + refresh tokens), Google OAuth 2.0                           |
| **Media**    | Pillow for image handling, Django media file serving                      |

---

## 📁 Project Structure

```
Ecommerce/
├── Backend/
│   └── project_ecommerce/
│       ├── API/                  # Product, User & Address APIs + models
│       │   ├── models.py         # userData, Product, Review, UserAddress
│       │   ├── serializers.py
│       │   ├── views.py
│       │   └── urls.py
│       ├── authentication/       # Registration, Login, Google OAuth
│       │   ├── views.py
│       │   └── urls.py
│       ├── Orders/               # Cart & Order management
│       │   ├── models.py         # Cart, Order, OrderItem
│       │   ├── serializers.py
│       │   ├── views.py
│       │   └── urls.py
│       ├── payment/              # Razorpay integration
│       │   ├── models.py         # Payment
│       │   ├── views.py
│       │   └── urls.py
│       ├── project_ecommerce/    # Django project settings
│       │   ├── settings.py
│       │   └── urls.py
│       ├── manage.py
│       └── requirements.txt
│
└── project_ecommerce/            # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── base.jsx           # Layout — Navbar + Footer
    │   │   ├── Productcard.jsx    # Product card component
    │   │   ├── ProductCardModal.jsx # Detailed product modal
    │   │   ├── add.jsx            # Add product form
    │   │   └── axiosInstance.js   # Axios config with JWT interceptor
    │   ├── pages/
    │   │   ├── home.jsx           # Product catalog / Hero section
    │   │   ├── login.jsx          # Login & Registration
    │   │   ├── myCart.jsx         # Shopping cart
    │   │   ├── orders.jsx         # Order history
    │   │   └── profile.jsx        # User profile management
    │   ├── router.jsx             # React Router config
    │   └── main.jsx               # App entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18  
- **Python** ≥ 3.10  
- **MySQL** ≥ 8.0  
- **Razorpay** account (for payment integration)  
- **Google Cloud Console** project (for OAuth)  

### 1. Clone the Repository

```bash
git clone https://github.com/Adik-09/project_ecommerce.git
cd project_ecommerce
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd Backend/project_ecommerce

# Create and activate a virtual environment
python -m venv ecommerce_env
ecommerce_env\Scripts\activate    # On Windows
# source ecommerce_env/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

#### Configure the Database

1. Create a MySQL database:

```sql
CREATE DATABASE ecommerce_db;
```

2. Update `Backend/project_ecommerce/project_ecommerce/settings.py` with your MySQL credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ecommerce_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

#### Configure API Keys

In `settings.py`, update the following:

```python
# Razorpay
RAZORPAY_KEY_ID = 'your_razorpay_key_id'
RAZORPAY_KEY_SECRET = 'your_razorpay_key_secret'

# Google OAuth
GOOGLE_CLIENT_ID = 'your_google_client_id.apps.googleusercontent.com'
```

#### Run Migrations & Start the Server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # Create an admin account
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/`.

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd project_ecommerce

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173/snapMart/home/`.

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| POST   | `/snapMart/register/`          | Register a new user          |
| POST   | `/snapMart/token/`             | Login (get JWT tokens)       |
| POST   | `/snapMart/token/refresh/`     | Refresh access token         |
| POST   | `/snapMart/google-auth/`       | Google OAuth login/signup    |
| GET    | `/snapMart/me/`                | Get current user profile     |
| PATCH  | `/snapMart/me/`                | Update current user profile  |

### Products
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/snapMart/products/`          | List all products            |
| GET    | `/snapMart/products/<id>/`     | Get product by ID            |
| POST   | `/snapMart/products/`          | Create a new product         |
| PATCH  | `/snapMart/products/<id>/`     | Update a product             |
| DELETE | `/snapMart/products/<id>/`     | Delete a product             |

### Cart
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/snapMart/myCart/`            | Get user's cart items        |
| POST   | `/snapMart/myCart/`            | Add item to cart             |
| PATCH  | `/snapMart/myCart/<id>/`       | Update cart item quantity    |
| DELETE | `/snapMart/myCart/<id>/`       | Remove item from cart        |

### Orders
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/snapMart/orders/`            | Get user's order history     |
| POST   | `/snapMart/orders/`            | Place an order               |
| PATCH  | `/snapMart/orders/<id>/`       | Cancel an order              |

### Payments
| Method | Endpoint                             | Description                 |
| ------ | ------------------------------------ | --------------------------- |
| POST   | `/snapmart/payment/create-order/`    | Create Razorpay order       |
| POST   | `/snapmart/payment/verify/`          | Verify payment & place order|

### Addresses
| Method | Endpoint                       | Description                  |
| ------ | ------------------------------ | ---------------------------- |
| GET    | `/snapMart/address/`           | Get user's addresses         |
| POST   | `/snapMart/address/`           | Add a new address            |

---

## 📸 Pages Overview

| Page         | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| **Home**     | Product catalog with cards, category filters, and product detail modals |
| **Login**    | Login & registration forms with Google OAuth button                     |
| **Cart**     | Shopping cart with quantity controls and checkout flow                   |
| **Orders**   | Order history with status badges and item breakdown                     |
| **Profile**  | User profile editor with avatar upload and address management           |

---

## 🛡️ Environment Variables

Create `.env` files in the appropriate directories for sensitive configuration:

**Backend** (`Backend/project_ecommerce/.env`):
```
SECRET_KEY=your-django-secret-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
GOOGLE_CLIENT_ID=your-google-client-id
```

**Frontend** (`project_ecommerce/.env`):
```
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

<div align="center">

**Built with ❤️ by [Adik-09](https://github.com/Adik-09)**

</div>
