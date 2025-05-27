# PYRE PRODUCT SERVICE

This repository hosts a **product service** built with Node.js and TypeScript, featuring a microservices architecture that includes:

- Supports both REST and gRPC communication
- PostgreSQL for data storage
- Elasticsearch for search functionality
- Health monitoring and metrics
- File upload capabilities

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Usage](#-usage)

---

## 🧭 Overview

The Pyre Product Service is a robust microservice designed to handle product management in an e-commerce system. It provides:

- Product management and validation
- File upload handling
- Search functionality with Elasticsearch
- Health monitoring
- gRPC and REST API support

---

## 🏗 Architecture

The service is built with the following key components:

- **Core Service**: Main product logic and business rules
- **Database Layer**: PostgreSQL for persistent storage
- **Search Layer**: Elasticsearch for efficient product search
- **Health Monitoring**: System health checks and metrics
- **File Upload**: Support for product image uploads

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL
- Elasticsearch
- TypeScript
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pyre-product.git
cd pyre-product
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run DB Migration:
```bash
yarn migrate
```

### Project Structure

```
.
├── src/                # Source code
│   ├── core/          # Core business logic
│   ├── core-internal/ # Internal core components
│   └── index.ts       # Application entry point
├── dist/              # Compiled JavaScript
├── protos/           # Protocol buffer definitions
└── migrations/       # Database migrations
```

---

## 🚢 Deployment

The service can be deployed using:

1. Local Development:
```bash
yarn dev
```

2. Production Build:
```bash
yarn build
yarn start
```

3. Docker:
```bash
docker-compose up --build
```

---

## 💼 Usage

### ✏️ Postman API Collection
```bash
https://www.postman.com/dark-eclipse-55522/workspace/pyre-public/collection/20536686-46c3db49-d794-4e99-b60e-6259265e181c?action=share&creator=20536686
```

### ♥️ System Health
```bash
curl --location 'localhost:8001/api/health/v1/'
```

### ➕ Insert Promotion
```bash
curl --location 'localhost:8001/api/products/v1'
--header 'Content-Type: application/json'
--data '{ "name": "Sample Product", "sku": "SP123456", "shop_id": "shop123", "description": "This is a sample product description.", "active": true, "brand": "Sample Brand", "category": "Sample Category", "images": [ "http://example.com/image1.jpg", "http://example.com/image2.jpg" ], "video": "http://example.com/video.mp4", "stock": 100, "status": "available", "variants": [ { "name": "Variant 1", "sku": "V123456", "variant_type": "color", "price": 19.99, "active": true, "stock": 50, "image": "http://example.com/variant1.jpg", "weight": 0.5, "height": 10, "width": 5, "length": 7 }, { "name": "Variant 2", "sku": "V654321", "variant_type": "size", "price": 29.99, "active": false, "stock": 25, "image": "http://example.com/variant2.jpg", "weight": 0.7, "height": 15, "width": 7, "length": 10 } ] }'
```

### 🔍 Detail Promotion
```bash
curl --location 'localhost:8001/api/products/v1/1707438f-96d6-41d7-b1a2-823463b479e1'
--data ''
```

### 📜 List Promotions
```bash
curl --location 'localhost:8001/api/products/v1/?size=10&sort=updated_at%20DESC&shop_id=shop123&page=1&size=10'
--data ''
```

### ❌ Delete Promotions
```bash
curl --location --request DELETE 'localhost:8001/api/products/v1/08a1b550-9635-4a40-ab9b-476a3d40cc73'
--data ''
```

### 🔧 Update Promotion
```bash
curl --location --request PUT 'localhost:8001/api/products/v1/1707438f-96d6-41d7-b1a2-823463b479e1'
--header 'Content-Type: application/json'
--data '{ "id": "1707438f-96d6-41d7-b1a2-823463b479e1", "created_at": "2024-09-15T05:05:25.850Z", "updated_at": "2024-09-15T05:05:25.850Z", "deleted_at": null, "uuid": "1707438f-96d6-41d7-b1a2-823463b479e1", "name": "Sample Product 7 Updated", "sku": "SP123457", "shop_id": "shop123", "description": "This is a sample product description 7 Updated.", "active": true, "brand": "Sample Brand 7", "category": "Sample Category 7", "images": [ "http://example.com/image3.jpg", "http://example.com/image4.jpg" ], "video": "http://example.com/video1.mp4", "status": "available", "variants": [ { "name": "Variant 1 Updated", "sku": "V123457", "variant_type": "color", "price": 21.99, "active": true, "stock": 600000, "image": "http://example.com/variant3.jpg", "weight": 0.6, "height": 11, "width": 6, "length": 8 }, { "name": "Variant 2 Updated", "sku": "V654322", "variant_type": "size", "price": 31.99, "active": false, "stock": 30000, "image": "http://example.com/variant4.jpg", "weight": 0.8, "height": 16, "width": 8, "length": 11 } ] }'

---
