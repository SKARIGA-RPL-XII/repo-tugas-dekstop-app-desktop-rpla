import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from API route");
});

router.get("/products", (req, res) => {
  const data = [
    {
      id: 1,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 750000,
      stock: 12,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 250000,
      stock: 30,
    },
    {
      id: 3,
      name: "Gaming Headset",
      category: "Electronics",
      price: 450000,
      stock: 18,
    },
    {
      id: 4,
      name: "Laptop Stand",
      category: "Accessories",
      price: 180000,
      stock: 25,
    },
    {
      id: 5,
      name: "USB-C Hub",
      category: "Accessories",
      price: 320000,
      stock: 20,
    },
    {
      id: 6,
      name: "External SSD 1TB",
      category: "Storage",
      price: 1500000,
      stock: 8,
    },
    {
      id: 7,
      name: "Webcam HD",
      category: "Electronics",
      price: 350000,
      stock: 14,
    },
    {
      id: 8,
      name: "Smartphone Tripod",
      category: "Accessories",
      price: 120000,
      stock: 40,
    },
    {
      id: 9,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 550000,
      stock: 16,
    },
    {
      id: 10,
      name: "Power Bank 20000mAh",
      category: "Electronics",
      price: 400000,
      stock: 22,
    },
  ];

  res.json(data);
});

export { router as route };
