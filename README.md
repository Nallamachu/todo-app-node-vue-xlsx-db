# 📝 Todo Application (Node.js + Vue.js + XLSX Database)

A full-stack **Todo Application** built using **Node.js** for the backend, **Vue.js** for the frontend, and an **Excel (.xlsx) file as the database**.  
This project demonstrates CRUD operations, REST API integration, and file-based data persistence without using a traditional database.

---

## 📌 Project Overview

**Project Name:** todo-app-node-vue-xlsx-db  
**Technology Stack:** Node.js, Vue.js, Excel (XLSX)  
**Database:** Excel Spreadsheet (.xlsx)  
**Type:** Full-Stack Web Application  

This project is designed mainly for **learning and demonstration purposes**, showcasing how structured data can be stored and managed using Excel files instead of SQL or NoSQL databases.

---

## 🏗️ Project Architecture

The project follows a **client–server architecture**:

<img width="271" height="218" alt="image" src="https://github.com/user-attachments/assets/ea2b2ec0-4da9-4c59-a2c5-763ec1c73e8b" />


### 🔹 Frontend (Client)
- Built using **Vue.js**
- Provides UI to:
  - Add new todos
  - View todo list
  - Update existing todos
  - Delete todos
- Communicates with backend APIs using HTTP requests

### 🔹 Backend (Server)
- Built using **Node.js** (likely Express.js)
- Provides RESTful APIs
- Handles:
  - Reading todo data from Excel file
  - Writing and updating Excel file
  - CRUD operations

### 🔹 Database Layer
- Uses an **Excel (.xlsx) file** as a persistent data store
- Excel file is read and updated using Node.js XLSX libraries

---

## ✨ Features

- ✔ Create Todo
- ✔ Read Todo List
- ✔ Update Todo
- ✔ Delete Todo
- ✔ Data persistence using Excel file
- ✔ REST API integration
- ✔ Vue reactive UI

---

## ⚙️ Technologies Used

### Frontend
- Vue.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js (assumed)
- XLSX / Excel handling library

### Tools
- npm
- Git
- VS Code

---

## 🚀 Installation & Setup

### 🔹 Prerequisites
Make sure you have the following installed:
- Node.js (v16+ recommended)
- npm

---

### 🔹 Steps to Run the Project

#### 1. Clone the Repository
```bash
git clone https://github.com/Nallamachu/todo-app-node-vue-xlsx-db.git
cd todo-app-node-vue-xlsx-db
```
#### 2. Install dependency
```bash
npm install
```
#### 3. Start the application
```bash
npm run dev
```
#### 4. Open in browser
```ardunio
http://localhost:5173
```
<img width="748" height="530" alt="image" src="https://github.com/user-attachments/assets/0e149136-d6e2-4fb0-a922-112f93dcda06" />

### Strengths
- Simple and easy to understand architecture
- No external database required
- Great for beginners learning full-stack development
- Demonstrates file handling in Node.js

### Limitations
- Excel is not suitable for large-scale applications
- Concurrent file access may cause data inconsistency
- No authentication or authorization
- Limited scalability

### Future Enhancements
- Replace Excel with MongoDB or MySQL
- Add user authentication
- Improve UI/UX
- Add validations and error handling
- Add unit and integration tests

### Learning Outcomes
- Full-stack development using Vue and Node
- REST API design
- Excel file handling in Node.js
- CRUD operations
- Client–server communication

### License
This project is open-source and available for educational purposes.

### Acknowledgements
- Node.js community
- Vue.js framework
- Open-source XLSX libraries
