# 🛍️ Product Explorer

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-5.x-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
</p>

<p align="center">
  <strong>🚀 A Modern, Responsive & Feature-Rich E-Commerce Product Browsing Application</strong>
</p>

<p align="center">
  Discover products • Explore details • Manage cart • Checkout seamlessly
</p>

---

## 🌟 Overview

**Product Explorer** is a modern front-end e-commerce application designed to provide a smooth and realistic online shopping experience.

The application allows users to:

🔎 Discover and search products
🏷️ Filter products by category
📦 Explore detailed product information
🖼️ View product galleries and zoom images
🛒 Manage shopping cart items
⚡ Purchase products using Buy Now
🚚 Check delivery availability using pincode
💳 Complete a simulated checkout
✅ Receive an order confirmation

The project focuses on **modern UI/UX, reusable React components, TypeScript type safety, server-state management, responsive design, and clean application architecture.**

---

## ✨ Key Features

### 🔎 Product Discovery

* Search products by name
* Category-based filtering
* Dynamic product listing
* Product stock status
* Product ratings & reviews
* Refresh product data
* Responsive product grid
* Smooth hover interactions

### 🖱️ Interactive Product Experience

* Modern product hover effects
* Smooth CSS transitions
* Product click interaction
* Responsive product presentation
* Clean and minimal visual design
* Accessible focus states

### 📦 Product Details

Every product has a dedicated details page containing:

* 🖼️ Product image
* 🖼️ Multiple product images
* 🔍 Image switching
* 🔎 Image zoom interaction
* 🏷️ Product name
* 🏢 Brand
* 📂 Category
* ⭐ Rating
* 💬 Review count
* 💰 Current price
* 🏷️ Original/MRP price
* 📉 Discount percentage
* 💵 Savings amount
* 📦 Stock availability
* 🔖 SKU
* ✨ Product highlights
* 📝 Product description
* 📋 Product specifications
* 💬 Customer reviews
* 🔗 Related products

---

## 🚚 Smart Delivery Checker

The application includes an Indian **6-digit pincode validation system**.

### Features

* 🇮🇳 Indian pincode validation
* 🚚 Delivery availability check
* 📅 Estimated delivery information
* 📍 Delivery status display
* ✨ Clean and responsive UI

> **Note:** The pincode checker is currently a front-end demonstration and is not connected to a real courier or logistics API.

---

## 🛒 Shopping Cart

A complete shopping cart experience is implemented using **React Context + localStorage**.

### Cart Features

* ➕ Add products
* ➖ Increase/decrease quantity
* 🗑️ Remove products
* 🧹 Clear cart
* 🔢 Automatic cart count
* 💰 Automatic price calculation
* 💾 Persistent cart storage
* 🔄 Cart restoration after page refresh
* 🛍️ Continue shopping
* 💳 Checkout navigation

### Storage

```text
product-explorer-cart
```

---

## ⚡ Buy Now Flow

Users can directly purchase a product without manually opening the cart.

```text
┌──────────────────┐
│ Product Details  │
└────────┬─────────┘
         ↓
┌──────────────────┐
│     Buy Now      │
└────────┬─────────┘
         ↓
┌──────────────────┐
│     Checkout     │
└────────┬─────────┘
         ↓
┌──────────────────┐
│   Place Order    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Order Confirmed  │
└──────────────────┘
```

---

## 💳 Checkout Experience

The checkout page provides a complete simulated purchasing flow.

### Includes

* 👤 Customer information
* 📍 Delivery pincode
* 🛒 Order summary
* 🔢 Product quantity
* 💰 Total price
* ✅ Form validation
* 🧾 Order placement simulation
* 🔑 Generated order ID
* 🎉 Order confirmation

> **Important:** No real payment gateway, backend order processing, or real transaction is connected.

---

# 🧰 Technology Stack

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| ⚛️ React 19       | UI development                  |
| 🔷 TypeScript     | Type safety                     |
| ⚡ Vite            | Build tool & development server |
| 🔄 TanStack Query | Server-state management         |
| 🎨 CSS3           | Styling & responsive design     |
| 🌐 DummyJSON      | Product API                     |
| 💾 localStorage   | Cart persistence                |
| 🧹 Oxlint         | Code linting                    |

---

# 🌐 API Integration

Product information is powered by **DummyJSON**.

### API Operations

```text
GET Products
     │
     ├── All Products
     │
     ├── Single Product
     │
     └── Products by Category
```

The API response is transformed into a strongly typed **TypeScript product model** before being consumed by the React application.

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │    🌐 DummyJSON     │
                    │         API         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       api.ts        │
                    │     API Layer       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  TanStack Query     │
                    │   Server State      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Product Listing   Product Details      Cart
              │                │                │
              │                │                ▼
              │                │         CartContext
              │                │                │
              │                │                ▼
              │                │          localStorage
              │                │
              └────────────────┼────────────────┐
                               │                │
                               ▼                ▼
                         Checkout Flow      Buy Now
                               │
                               ▼
                       Order Confirmation
```

---

# 🧠 State Management

Cart state is centralized using **React Context API**.

```text
CartContext
    │
    ├── addToCart()
    │
    ├── updateQty()
    │
    ├── removeFromCart()
    │
    ├── clearCart()
    │
    └── count
```

Cart data is synchronized with browser `localStorage`, allowing users to keep their cart even after refreshing the application.

---

# 🧭 Application Routes

| Route                                | Description       |
| ------------------------------------ | ----------------- |
| `/`                                  | Product listing   |
| `/?category=<category>`              | Filtered products |
| `/product/:id`                       | Product details   |
| `/cart`                              | Shopping cart     |
| `/checkout`                          | Checkout          |
| `/checkout?productId=<id>&qty=<qty>` | Buy Now checkout  |

---

# 🎨 UI / UX Design

Product Explorer follows a **modern premium e-commerce design language**.

### 🎯 Design Highlights

* 🌑 Dark modern theme
* 🟠 Orange primary accent
* 🟢 Green stock indicators
* 🟡 Amber ratings
* ✨ Smooth hover effects
* 🔍 Image zoom interaction
* 📐 Clean spacing
* 📝 Clear typography hierarchy
* 📱 Responsive layouts
* ♿ Accessible focus states
* 📦 Minimal card-based UI
* 🚀 Smooth user interactions

The product listing intentionally uses an **open and free-flowing layout** instead of relying heavily on large boxed cards.

---

# 🖱️ Product Hover Interaction

When the user hovers over a product:

```text
Normal Product
      ↓
Mouse Hover
      ↓
Highlight / Color Change
      ↓
Smooth CSS Transition
      ↓
Mouse Leave
      ↓
Original Appearance
```

The interaction is designed to provide visual feedback without unnecessary movement or excessive animation.

---

# 📱 Responsive Design

Product Explorer is designed for multiple screen sizes.

### 💻 Desktop

* Multi-column product layout
* Large product images
* Spacious details section
* Two-column product information

### 📱 Tablet

* Flexible product grid
* Optimized spacing
* Responsive details layout

### 📱 Mobile

* Single-column product layout
* Stacked product information
* Full-width action buttons
* Mobile-friendly cart
* Responsive checkout form

---

# 📂 Project Structure

```text
Product Explorer/
│
├── 📁 public/
│   ├── favicon.svg
│   └── icons.svg
│
├── 📁 src/
│   │
│   ├── 📁 assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── api.ts
│   ├── App.tsx
│   ├── App.css
│   ├── Cart.tsx
│   ├── Cart.css
│   ├── CartContext.tsx
│   ├── Checkout.tsx
│   ├── ProductDetails.tsx
│   ├── ProductDetails.css
│   ├── Stars.tsx
│   ├── format.ts
│   ├── index.css
│   ├── main.tsx
│   ├── router.tsx
│   └── types.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

## 2️⃣ Navigate to Project

```bash
cd "Product Explorer"
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Start Development Server

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

## 5️⃣ Build for Production

```bash
npm run build
```

## 6️⃣ Preview Production Build

```bash
npm run preview
```

## 7️⃣ Run Linting

```bash
npm run lint
```

---

# 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # TypeScript check and production build
npm run preview   # Preview production build
npm run lint      # Run Oxlint
```

---

# 🧪 Complete User Journey

```text
                 🛍️ Product Explorer
                         │
                         ▼
                 🔎 Search / Filter
                         │
                         ▼
                  📦 Product Listing
                         │
                         ▼
                  🖱️ Hover Product
                         │
                         ▼
                 👆 Click Product
                         │
                         ▼
                 📄 Product Details
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
          🛒 Add to Cart      ⚡ Buy Now
                │                 │
                ▼                 ▼
             🛒 Cart          💳 Checkout
                │                 │
                └────────┬────────┘
                         ▼
                   📦 Place Order
                         │
                         ▼
                 🎉 Order Confirmed
```

---

# 🔐 Data & Checkout Disclaimer

Product Explorer is a **front-end e-commerce demonstration project**.

### Not Included

* ❌ User authentication
* ❌ Real payment processing
* ❌ Real order database
* ❌ Real inventory synchronization
* ❌ Real courier API
* ❌ Server-side checkout
* ❌ Production order management

The checkout system is designed to demonstrate a realistic shopping experience from product discovery to order confirmation.

---

# 🔮 Future Improvements

The project can be extended with:

* 🔐 User authentication
* 👤 User profiles
* ❤️ Wishlist
* 💳 Real payment gateway
* 📍 Real pincode/delivery API
* 📦 Backend inventory management
* 🗄️ Database integration
* 🧾 Order history
* 🔔 Toast notifications
* 🌓 Light/Dark theme switcher
* 📊 Admin dashboard
* 🎟️ Coupon system
* 🚚 Real-time order tracking
* 🔎 Advanced search
* 📊 Product analytics
* 🧪 Unit & integration testing
* 🚀 CI/CD deployment

---

# 🤝 Contributing

Contributions are welcome!

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Validate the project

```bash
npm run lint
npm run build
```

### Commit changes

```bash
git commit -m "feat: add your feature"
```

### Push your branch

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 📄 License

This project is created for **learning, portfolio, and demonstration purposes**.

For public distribution, an appropriate open-source license such as **MIT** can be added.

---

# 👨‍💻 Author

## Gauresh Badgujar

**Full Stack Java Developer | Software Developer**

### 💻 Technologies

`Java` • `Spring Boot` • `React` • `TypeScript` • `JavaScript` • `SQL` • `MongoDB`

---

# ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

Your support is appreciated! ❤️

---

<p align="center">
  <strong>🛍️ Product Explorer</strong>
  <br/>
  Modern shopping experience built with React & TypeScript.
</p>

<p align="center">
  Made with ❤️ by <strong>Gauresh Badgujar</strong>
</p>
