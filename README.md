# 📱 Phones (fullstack)

**A fullstack application for managing phones, built with JavaScript.**

> A portfolio project to demonstrate CRUD operations, REST API, Sequelize associations, Express.js routing, and a React client.

---

## 🚀 About the project

This project showcases my ability to build a complete fullstack CRUD application with a relational database.  
The backend provides a REST API for managing phones, including:
- Create
- Read
- Update
- Delete

and supports relations with another entity (brand).  
The frontend allows users to create, view, edit, and delete phones through a web interface.

---

## 🧰 Tech stack

- **Backend**
  - Node.js
  - Express.js
  - Sequelize (PostgreSQL)
  - dotenv
  - Express Router
- **Frontend**
  - React
  - Fetch API
  - HTML / CSS / JS

---

## 📂 Features

### Backend
✅ REST API endpoints:  
- `GET /phones` — fetch all phones  
- `GET /phones/:id` — fetch a phone by ID  
- `POST /phones` — create a phone  
- `PUT /phones/:id` — update a phone  
- `DELETE /phones/:id` — delete a phone

✅ Additional:
- Added `Brand` model (phone brand)
- Defined `Brand — Phone` relationship
- `GET /brands/:brandId/phones` — fetch all phones of a specific brand
- `POST /brands/:brandId/phones` — add a phone to a specific brand

✅ Used `.env` for environment configuration

✅ Updated migrations with additional constraints

---

### Frontend
✅ Main page: view all phones  
✅ Create phone form  
✅ Delete phone  
✅ Toggle `isNfc` field

---

## 📦 Getting started

### Backend
```bash
cd server
npm install
npx sequelize-cli db:migrate
npm run dev
```
**Backend runs at http://localhost:5000**


### Frontend
```bash
cd client
npm install
npm start
```

**Frontend runs at http://localhost:5173**