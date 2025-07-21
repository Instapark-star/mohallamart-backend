# 🛒 MohallaMart Backend

A simple yet powerful backend system to digitize local kirana/dukaan operations — built with Node.js, Express, and MongoDB.

## 🚀 Project Overview

MohallaMart allows small shopkeepers to:
- Register their shop
- Add/manage inventory (with product images)
- Create customer orders
- Instantly generate WhatsApp order messages

> 🧠 “Think of it as a mini Amazon for local businesses — powered by WhatsApp.”

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** (local)
- **Multer** for image uploads
- **Postman** for API testing
- **VS Code** + PowerShell Terminal (Windows)

---

## 📁 Folder Structure
```
mohallamart-backend/
├── models/                 # Mongoose schemas for Shop, Product, Order
├── controllers/            # All business logic (Shop, Inventory, Order)
├── routes/                 # Express route handlers
├── middlewares/            # Image upload middleware (Multer)
├── public/uploads/         # Folder to store uploaded product images
├── app.js                  # Main Express app with all routes
├── server.js               # Server entry point, MongoDB connection
├── .env                    # Environment variables (PORT, MONGO_URI)
└── package.json            # Project config + scripts
```
## 📌 API Endpoints Summary
---

## 📤 Sample Request Payload — Create Order

### Endpoint:
```http
POST /api/shop/:shopId/order

### 🏪 Shop Routes
| Method | Route                 | Description         |
|--------|----------------------|---------------------|
| POST   | `/api/shop/register` | Register a new shop |

---

### 📦 Inventory Routes
| Method | Route                            | Description               |
|--------|----------------------------------|---------------------------|
| POST   | `/api/:shopId/inventory`         | Add product with image    |
| GET    | `/api/:shopId/inventory`         | Get shop inventory        |
| PUT    | `/api/product/:productId`        | Edit a product            |
| DELETE | `/api/product/:productId`        | Delete a product          |

---

### 📑 Order Routes
| Method | Route                             | Description                |
|--------|-----------------------------------|----------------------------|
| POST   | `/api/shop/:shopId/order`         | Create a new order         |
| GET    | `/api/shop/:shopId/orders`        | View all orders for shop   |
| GET    | `/api/order/:orderId`             | Get order by ID            |
| PUT    | `/api/order/:orderId/status`      | Update order status        |
| DELETE | `/api/order/:orderId`             | Delete order               |

✅ Every order also auto-generates a WhatsApp link with product + bill details.

{
  "customerName": "Anita Sharma",
  "customerPhone": "9876543210",
  "items": [
    {
      "productId": "64f0c0cbb2f4f72a3c0a77d1",
      "quantity": 2
    },
    {
      "productId": "64f0c0dcb2f4f72a3c0a77d5",
      "quantity": 1
    }
  ]
}
{
  "message": "Order created successfully",
  "order": {
    "_id": "64f0e9a6b2f4f72a3c0a78c9",
    "shopId": "64f0c0a1b2f4f72a3c0a77c0",
    "customerName": "Anita Sharma",
    "customerPhone": "9876543210",
    "items": [
      {
        "product": {
          "name": "Aashirvaad Atta",
          "price": 250
        },
        "quantity": 2
      },
      {
        "product": {
          "name": "Maggi Noodles",
          "price": 15
        },
        "quantity": 1
      }
    ],
    "totalAmount": 515,
    "status": "Pending",
    "whatsappLink": "https://wa.me/919876543210?text=Your%20order%20details%3A%20..."
  }
}
---

## ⚙️ Run Locally

### 1️⃣ Clone the repo:
```bash
git clone https://github.com/yourusername/mohallamart-backend.git
cd mohallamart-backend
---

## 📬 Postman API Testing

Use the Postman tool to test all routes.

🛠️ Base URL:
http://localhost:5000/

### 🔗 Postman Collection:
A collection of all routes (shop, inventory, orders) will be exported as a `.json` file soon.

➡️ You'll be able to import it into Postman and test everything in a click.

---

[Download Collection](link-to-postman-collection.json)
## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ❤️ Thanks for checking out MohallaMart!

Built with ❤️ to empower local Indian kirana stores.
