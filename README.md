  # TorchEye Ledger

A full-stack Expense Tracker application built with **React**, **Spring Boot**, **Keycloak**, and **MySQL**. This project demonstrates a modern enterprise-style architecture with secure authentication, RESTful APIs, and Dockerized infrastructure.

---

## Features

### Authentication & Security

* User registration and login with Keycloak
* OAuth2 / OpenID Connect authentication
* JWT-based authorization
* Protected REST APIs using Spring Security
* Role-based access control

### Expense Management

* Create, update, and delete transactions
* Create, update, and delete categories
* Filter transactions by month, category, and transaction type
* Dashboard summary with income, expense, and balance

### User Management

* Automatic user provisioning on first login
* User data linked with Keycloak through `auth_user_id`
* Separate application user data from identity management

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate

### Authentication

* Keycloak
* OAuth2 Resource Server
* JWT

### Database

* MySQL
* Separate databases for:

  * Keycloak
  * Expense Tracker

### DevOps

* Docker
* Docker Compose

---

## Project Structure

```text
Frontend (React)
        │
        ▼
Spring Boot REST API
        │
        ▼
Spring Security + JWT
        │
        ▼
MySQL Database
        ▲
        │
Keycloak Authentication Server
```

---

## Getting Started

### Prerequisites

* Java 21+
* Node.js 24+
* Docker Desktop
* MySQL (optional if using Docker)

### Run the Project

1. Start MySQL and Keycloak

```bash
docker compose up
```

2. Start the Spring Boot backend

```bash
./mvnw spring-boot:run
```

3. Start the React frontend

```bash
npm install
npm run dev
```

---

## Current Progress

Implemented modules:

* ✅ Keycloak authentication
* ✅ Spring Security JWT authentication
* ✅ User auto provisioning
* ✅ Category management
* ✅ Transaction management
* ✅ Dashboard summary
* ✅ Dockerized MySQL and Keycloak
* ✅ RESTful API architecture

This project is actively being developed, and additional features will be added in future updates.
