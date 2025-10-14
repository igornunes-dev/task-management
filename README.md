# 🗂️ TaskManager - Task Management System

## 📘 About the Project

**TaskManager** is a **SaaS (Software as a Service)** application developed as part of a technical challenge.
The goal is to provide a robust platform for task management, allowing users to control their activities in a simple and efficient way.

The application includes **CRUD operations for tasks**, **user authentication**, **status filtering**, and a **dashboard with progress metrics**.

---

## ⚙️ Technologies Used

This project was built using a modern and robust ecosystem, focusing on best development practices and scalability.

### 🧩 Backend

* **Laravel**: PHP framework for building the API, business logic, and authentication.
* **Pest**: Testing framework to ensure backend code quality and security.
* **PostgreSQL**: Relational database management system.

### 💻 Frontend

* **React**: JavaScript library for building user interfaces.
* **Inertia.js**: The “glue” that connects the Laravel backend to the React frontend, creating a Single-Page Application (SPA) experience with the simplicity of a monolithic app.
* **TypeScript**: A superset of JavaScript that adds static typing for safer and more maintainable code.
* **Tailwind CSS**: Utility-first CSS framework for creating modern and responsive designs.
* **Lucide-React**: Lightweight and customizable SVG icon library.

### 🐳 Development Environment

* **Docker**: Platform for creating, deploying, and running applications in containers, ensuring a consistent and isolated development environment.
* **Vite**: Frontend build tool that provides extremely fast development with Hot Module Replacement (HMR).

---

## 🧱 Prerequisites

Before starting, make sure you have the following tools installed on your machine:

* Git
* Docker
* Docker Compose

---

## 🚀 Installation and Local Setup

### 1️⃣ Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd task-management
```

### 2️⃣ Switch to the Development Branch

```bash
git checkout dev
```

### 3️⃣ Configure the Environment

Copy the example file `.env.example` to create your own `.env` configuration file.

```bash
make env
# or
cp .env.example .env
```

### 4️⃣ Adjust Permissions (Linux/macOS Only)

```bash
sudo chown -R $USER:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 5️⃣ Start the Containers

```bash
make up
# or
docker compose up --build -d
```

> **Note:** The first run may take a few minutes as Docker downloads the images and builds the containers.

### 6️⃣ Generate the Application Key

```bash
make key
# or
docker compose exec app php artisan key:generate
```

### 7️⃣ Run Database Migrations

```bash
make fresh
# or
docker compose exec app php artisan migrate:fresh
```

---

## 🌐 Accessing the Application

After completing all the steps, the application will be running and accessible in your browser:

**URL:** [http://localhost:8080](http://localhost:8080)

---
