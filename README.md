# 🚀 Data Ingestion API System

A priority-based, batch-processed data ingestion system built with Node.js and Express.js. It supports asynchronous processing with rate limits and allows users to check status of their ingestion jobs.

---

## 🌐 Hosted URL

[[https://your-app-name.onrender.com](https://your-app-name.onrender.com)](https://data-ingestion-api-16mg.onrender.com)

---

## 📌 Features

- Accepts ID ingestion jobs with `HIGH`, `MEDIUM`, or `LOW` priority
- Batches processed asynchronously (3 IDs per batch, 1 batch every 5 seconds)
- Priority-based queueing
- Check job status with batch-wise progress
- Mock external data fetching for each ID

---

## 📮 API Endpoints

### 🔹 POST `/ingest`

**Request:**
```json
{
  "ids": [1, 2, 3, 4, 5],
  "priority": "HIGH"
}
```
**Response:**
```json
{
  "ingestion_id": "abc123"
}
```

## 📸 Screenshots

<img width="674" alt="02" src="https://github.com/user-attachments/assets/fd5e6ba0-1382-45f6-80a7-cda5dcb8e254" />
<img width="672" alt="01" src="https://github.com/user-attachments/assets/f4404865-3fef-49ef-9884-c3436af063c4" />

## ✍️ Author

Ansh Arora

