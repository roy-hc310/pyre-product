cURLs:

**System Health:** 
curl --location 'hoachu.pro:8001/api/health/v1/' \
--data ''

**Insert Product:**
curl --location 'hoachu.pro:8001/api/products/v1' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Sample Product",
  "sku": "SP123456",
  "shop_id": "shop123",
  "description": "This is a sample product description.",
  "active": true,
  "brand": "Sample Brand",
  "category": "Sample Category",
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ],
  "video": "http://example.com/video.mp4",
  "stock": 100,
  "status": "available",
  "variants": [
    {
      "name": "Variant 1",
      "sku": "V123456",
      "variant_type": "color",
      "price": 19.99,
      "active": true,
      "stock": 50,
      "image": "http://example.com/variant1.jpg",
      "weight": 0.5,
      "height": 10,
      "width": 5,
      "length": 7
    },
    {
      "name": "Variant 2",
      "sku": "V654321",
      "variant_type": "size",
      "price": 29.99,
      "active": false,
      "stock": 25,
      "image": "http://example.com/variant2.jpg",
      "weight": 0.7,
      "height": 15,
      "width": 7,
      "length": 10
    }
  ]
}'

**Detail Product:**
curl --location 'hoachu.pro:8001/api/products/v1/1707438f-96d6-41d7-b1a2-823463b479e1' \
--data ''

**Update Product:**
curl --location --request PUT 'hoachu.pro:8001/api/products/v1/1707438f-96d6-41d7-b1a2-823463b479e1' \
--header 'Content-Type: application/json' \
--data '{
    "id": "1707438f-96d6-41d7-b1a2-823463b479e1",
    "created_at": "2024-09-15T05:05:25.850Z",
    "updated_at": "2024-09-15T05:05:25.850Z",
    "deleted_at": null,
    "uuid": "1707438f-96d6-41d7-b1a2-823463b479e1",
    "name": "Sample Product 7 Updated",
    "sku": "SP123457",
    "shop_id": "shop123",
    "description": "This is a sample product description 7 Updated.",
    "active": true,
    "brand": "Sample Brand 7",
    "category": "Sample Category 7",
    "images": [
        "http://example.com/image3.jpg",
        "http://example.com/image4.jpg"
    ],
    "video": "http://example.com/video1.mp4",
    "status": "available",
    "variants": [
        {
            "name": "Variant 1 Updated",
            "sku": "V123457",
            "variant_type": "color",
            "price": 21.99,
            "active": true,
            "stock": 600000,
            "image": "http://example.com/variant3.jpg",
            "weight": 0.6,
            "height": 11,
            "width": 6,
            "length": 8
        },
        {
            "name": "Variant 2 Updated",
            "sku": "V654322",
            "variant_type": "size",
            "price": 31.99,
            "active": false,
            "stock": 30000,
            "image": "http://example.com/variant4.jpg",
            "weight": 0.8,
            "height": 16,
            "width": 8,
            "length": 11
        }
    ]
}'

**List Products:**
curl --location 'hoachu.pro:8001/api/products/v1/?size=10&sort=updated_at%20DESC&shop_id=shop123&cursor=7' \
--data ''

**Delete Product:**
curl --location --request DELETE 'hoachu.pro:8001/api/products/v1/08a1b550-9635-4a40-ab9b-476a3d40cc73' \
--data ''
