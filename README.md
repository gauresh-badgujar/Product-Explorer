# 🛍️ Product Explorer

A modern, responsive, and feature-rich **e-commerce product browsing application** built with **React, TypeScript, Vite, and TanStack Query**.

Product Explorer provides a complete shopping experience — from discovering products and viewing detailed product information to managing the shopping cart and completing a simulated checkout flow.

---

## ✨ Features

### 🔎 Product Discovery

* Search products by name
* Filter products by category
* Refresh product data
* Dynamic product listing
* Product stock status
* Product ratings
* Responsive product grid
* Smooth product hover effects

### 🖱️ Interactive Product Experience

* Modern hover color/highlight effect
* Smooth CSS transitions
* Clean open/free-flowing product layout
* Product click interaction
* Responsive product presentation

### 📦 Product Details

Click any product to open a complete product details page.

Includes:

* Product image
* Product image gallery
* Image switching
* Image zoom interaction
* Product name
* Brand
* Category
* Rating
* Review count
* Current price
* Original/MRP price
* Discount percentage
* Savings amount
* Stock availability
* SKU
* Product highlights
* Product description
* Product specifications
* Customer reviews
* Related products

### 🚚 Delivery & Pincode

* Indian 6-digit pincode validation
* Delivery availability checker
* Estimated delivery information
* Delivery status display
* Clean delivery section

> The pincode checker is currently a front-end demonstration and is not connected to a real courier or logistics API.

### 🛒 Shopping Cart

* Add products to cart
* Increase quantity
* Decrease quantity
* Remove products
* Automatic price calculation
* Automatic cart count
* Persistent cart using `localStorage`
* Cart summary
* Continue shopping
* Checkout navigation

### ⚡ Buy Now

The Buy Now functionality provides a direct purchase flow:

```text
Product Details
      ↓
   Buy Now
      ↓
   Checkout
      ↓
 Place Order
      ↓
Order Confirmation
```

### 💳 Checkout

The checkout page includes:

* Customer information
* Delivery pincode
* Order summary
* Product quantity
* Total price
* Form validation
* Order placement simulation
* Generated order ID
* Order confirmation

> **Note:** This is a front-end demonstration. No real payment gateway or real order-processing backend is connected.

---

## 🧰 Tech Stack

| Technology     | Purpose                                    |
| -------------- | ------------------------------------------ |
| React 19       | UI development                             |
| TypeScript     | Type safety                                |
| Vite           | Development server and build tool          |
| TanStack Query | API fetching and server-state management   |
| CSS3           | Styling, responsive design, and animations |
| DummyJSON API  | Product data                               |
| localStorage   | Cart persistence                           |
| Oxlint         | Code linting                               |

---

## 🌐 API

Product information is powered by **DummyJSON**.

The application uses API endpoints for:

* Fetching products
* Fetching individual products
* Fetching products by category

The API response is mapped into the application's TypeScript product model.

---

## 📁 Project Structure

```text
Product Explorer/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
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

## 🧩 Application Architecture

```text
                    ┌─────────────────────┐
                    │    DummyJSON API    │
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
                    │   TanStack Query    │
                    │   Server State      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       Product Listing   Product Details       Cart
              │                │                │
              │                │                ▼
              │                │        CartContext
              │                │                │
              │                │                ▼
              │                │          localStorage
              │                │
              └────────────────┼────────────────┐
                               ▼                │
                         Checkout Flow ◄────────┘
```

---

## 🛒 Cart State Management

Cart functionality is managed through a dedicated React Context.

```text
CartContext
   │
   ├── addToCart()
   ├── updateQty()
   ├── removeFromCart()
   ├── clearCart()
   └── count
```

Cart items are synchronized with browser `localStorage`, allowing the cart to remain available after refreshing the page.

Storage key:

```text
product-explorer-cart
```

---

## 🧭 Client-Side Routes

| Route                                | Purpose                   |
| ------------------------------------ | ------------------------- |
| `/`                                  | Product listing           |
| `/?category=<category>`              | Category-filtered listing |
| `/product/:id`                       | Product details           |
| `/cart`                              | Shopping cart             |
| `/checkout`                          | Checkout                  |
| `/checkout?productId=<id>&qty=<qty>` | Buy Now checkout          |

---

## 🎨 UI / UX

The application follows a clean, modern, premium e-commerce design.

### Design Principles

* Dark modern theme
* Orange primary accent
* Green stock indicators
* Amber product ratings
* Open/free-flowing product layout
* Minimal card usage
* Clean spacing
* Clear typography hierarchy
* Smooth hover effects
* Image zoom interaction
* Responsive layouts
* Accessible focus states
* Mobile-friendly controls
* Professional e-commerce experience

The product listing intentionally avoids a heavy card-based design. Products are presented using spacing, typography, alignment, and subtle hover effects rather than large boxed containers.

---

## 🖱️ Product Hover Effect

When the user moves the mouse over a product:

* Product color/highlight changes
* Smooth CSS transition is applied
* The hovered product becomes visually noticeable
* No unnecessary movement or excessive animation is used
* The original appearance is restored smoothly when the cursor leaves

---

## 📱 Responsive Design

The application is optimized for:

### 💻 Desktop

* Multi-column product grid
* Spacious product layout
* Two-column product details
* Large product images

### 📱 Tablet

* Responsive product grid
* Optimized spacing
* Flexible product details layout

### 📱 Mobile

* Responsive product layout
* Stacked product details
* Full-width action buttons
* Mobile-friendly cart
* Responsive checkout form

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd "Product Explorer"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will typically be available at:

```text
http://localhost:5173
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

### 7. Run Linting

```bash
npm run lint
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # TypeScript check and production build
npm run preview   # Preview production build
npm run lint      # Run Oxlint
```

---

## 🧪 User Flow

```text
                    Product Explorer
                           │
                           ▼
                  Search / Filter
                           │
                           ▼
                    Product Listing
                           │
                           ▼
                    Hover Product
                           │
                           ▼
                   Click Product
                           │
                           ▼
                  Product Details
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
        Add to Cart                  Buy Now
              │                         │
              ▼                         ▼
            Cart                    Checkout
              │                         │
              └────────────┬────────────┘
                           ▼
                     Place Order
                           │
                           ▼
                  Order Confirmation
```

---

## 🔐 Data & Checkout Notes

This project is a **front-end e-commerce demonstration**.

The project currently does not include:

* User authentication
* Real payment processing
* Real order database
* Real inventory synchronization
* Real delivery/courier API
* Server-side checkout
* Production order management

The checkout flow is designed to demonstrate the complete shopping experience.

---

## 🚀 Future Improvements

Potential future improvements include:

* 🔐 User authentication
* 👤 User profile
* ❤️ Wishlist
* 💳 Real payment gateway integration
* 📍 Real delivery/pincode API
* 📦 Backend inventory management
* 🗄️ Database integration
* 🧾 Order history
* 🔔 Toast notification system
* 🌓 Light/Dark theme switcher
* 📊 Admin dashboard
* 🎟️ Coupon and discount system
* 🚚 Real-time order tracking
* 🔎 Advanced search and filtering
* 📈 Product analytics
* 🧪 Unit and integration testing
* 🚀 CI/CD deployment pipeline

---

## 🤝 Contributing

Contributions are welcome.

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Run validation

```bash
npm run lint
npm run build
```

### Commit your changes

```bash
git commit -m "feat: add your feature"
```

### Push your branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project is intended for learning, portfolio, and demonstration purposes.

If you plan to distribute this project publicly, consider adding an appropriate open-source license such as MIT.

---

## 👨‍💻 Author

**Gauresh Badgujar**

Full Stack Java Developer | Software Developer

### Built With

* ⚛️ React
* 🔷 TypeScript
* ⚡ Vite
* 🔄 TanStack Query
* 🎨 CSS
* 🌐 DummyJSON API

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Thank you for checking out Product Explorer! 🛍️**
