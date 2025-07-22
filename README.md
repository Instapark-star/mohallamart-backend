# 🛒 MohallaMart Backend

This is the backend server for **MohallaMart** — a hyperlocal dukaan & delivery platform that enables customers to place orders, shopkeepers to manage inventory, helpers or gig workers to assist with deliveries, and includes support for subscriptions, medicine, alcohol, and vegetable delivery from nearby shops.

---

## ✅ Features Implemented

| Feature                                 | Status  | Endpoint                               |
|----------------------------------------|---------|----------------------------------------|
| Shop Registration with Geolocation     | ✅ Done | `POST /api/shop/register`              |
| Product Add/Edit/Delete with Image     | ✅ Done | `POST /api/:shopId/inventory`          |
| Get Inventory per Shop                 | ✅ Done | `GET /api/:shopId/inventory`           |
| Order Creation + WhatsApp Integration  | ✅ Done | `POST /api/shop/:shopId/order`         |
| View All Orders of a Shop              | ✅ Done | `GET /api/shop/:shopId/orders`         |
| View Single Order by ID                | ✅ Done | `GET /api/order/:orderId`              |
| Delete Order                           | ✅ Done | `DELETE /api/order/:orderId`           |
| Update Order Status                    | ✅ Done | `PUT /api/order/:orderId/status`       |
| Claim Order (First Come Logic)         | ✅ Done | `POST /api/order/:orderId/claim`       |
| Assign Delivery Person (helper/gig)    | ✅ Done | `POST /api/order/:orderId/assign`      |
| Mark Order as Delivered                | ✅ Done | `POST /api/order/:orderId/delivered`   |
| Find Nearby Shops (within 2km)         | ✅ Done | `POST /api/order/nearby-shops`         |
| Register User (helper/gig/customer)    | ✅ Done | `POST /api/user/register`              |
| Find Nearby Helpers/Gig Workers        | ✅ Done | `POST /api/user/nearby`                |
| Upgrade Shop Subscription Tier         | ✅ Done | `PUT /api/shop/:shopId/upgrade`        |

---

## 🗃️ Models

### 🏪 Shop Model (`models/Shop.js`)
- `shopName`, `ownerName`, `phone`, `address`
- `location`: GeoJSON Point
- `subscriptionTier`: `"standard" | "advanced" | "big_deal"`
- `subscriptionValidTill`: Date

### 📦 Product Model (`models/Product.js`)
- `shopId`, `name`, `quantity`, `price`, `image`
- Category flags: `isMedicine`, `isAlcohol`

### 📬 Order Model (`models/Order.js`)
- `shopId`, `customerName`, `customerPhone`, `items[]`
- `customerLocation`: GeoJSON Point
- `claimedBy`: Shop ID
- Delivery fields:
  - `deliveryBy`, `deliveryMode`, `tipAmount`, `paidOnline`
- `status`: `"pending" → "claimed" → "ready" → "out_for_delivery" → "delivered"`
- `deliveredAt`: Date

### 👤 User Model (`models/User.js`)
- `name`, `phone`, `role`: `"helper" | "gig_worker" | "admin" | "customer"`
- `location`: GeoJSON Point

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB with Mongoose
- Multer (for image upload)
- RESTful API design
- Geo queries using `2dsphere` index
- WhatsApp integration for customer messaging

---

## 📁 Folder Structure

mohallamart-backend/
├── controllers/
├── models/
├── routes/
├── uploads/ # Static image folder
├── .env
├── app.js
├── server.js
└── README.md

yaml
Copy
Edit

---

## 🧪 Postman Testing

❌ **Not yet tested via Postman.**  
Testing is planned but skipped during development phase to fast-track MVP delivery and frontend handover.

---

## 📤 Deployment & Run

- Clone the repo and run:

```bash
npm install
npm run dev
.env required with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
Access on: http://localhost:5000

💡 Key Business Logic
Orders are broadcasted to shops within 2km.

First shop to claim gets the order.

Delivery options:

🚶‍♂️ Helper (normal users, tip-based, online prepaid only)

🛵 Gig Workers (cash/online support, delivery app concept)

Helpers are not full-time delivery agents but casual workers.

Delivery people or helpers can be assigned manually.

Orders include live geolocation for matching logistics.

Customers may be offered handpicked vegetables, medicines, alcohol from local verified vendors.

💰 Revenue Model
No commission cut from shopkeepers.

Instead, shops pay a monthly subscription:

standard, advanced, or big_deal

Subscription gives visibility, analytics & claim priority.

🧭 Future Scope
✅ Frontend in React / Next.js

🔐 OTP login, JWT-based auth

🛍️ Customer order dashboard

📊 Shop analytics dashboard

💸 Razorpay or UPI integration

🧾 PDF receipts & order history

📱 Native app for helpers and gig workers

🤝 Built With
💻 Node.js + Express + MongoDB

🧠 Business Logic by MohallaMart Team

📦 Modular Clean Folder Structure

🤖 Co-developed with help of AI (ChatGPT)

yaml
Copy
Edit

---

