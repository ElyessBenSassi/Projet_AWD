# 🛠️ Microservices Architecture with Spring Boot, Docker, and PostgreSQL

This project is a microservices setup using Spring Boot, Docker Compose, PostgreSQL, Eureka Discovery Server, and an API Gateway.

---

## I. What's Included

- **Eureka Discovery Server** - Central service registry
- **API Gateway** - Entry point for routing requests to microservices
- **Order Microservice** - microservice for managing orders
- **PostgreSQL Database** - Persistent storage for microservices

---

## II. Project Architecture

```
microservices-project/
├── Eureka/            # Eureka Discovery Server
├── ApiGateway/        # Spring Cloud Gateway
├── Order-ms/          # Order Microservice
├── docker-compose.yml # Docker Compose file
└── README.md
```

---

## III. How to Run the Project

1. **Clone the repository**

```bash
git clone https://github.com/ElyessBenSassi/Projet_AWD.git
cd microservices-project
```

2. **Build and start all services using Docker Compose**

```bash
docker-compose up --build
```

3. **Access the services**

- Eureka Dashboard: [http://localhost:8761](http://localhost:8761)
- API Gateway: [http://localhost:8080](http://localhost:8080)

---

## IV. Services Overview

| Service       | Port  | Description                                |
|---------------|-------|--------------------------------------------|
| PostgreSQL    | 5432  | Relational database for storing order data |
| Eureka Server | 8761  | Service registry and discovery             |
| API Gateway   | 8080  | Entry point for routing to microservices   |
| Order Service | 8082  | Microservice for managing orders           |

---
