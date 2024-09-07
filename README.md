# EMI Calculator API 

This project implements a REST API for an EMI (Equated Monthly Installment) calculator with a prepayment option using Node.js, Express, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- TypeScript
- docker 
- docker-compose

## Setup

1. Clone the repository:
   ```
   git clone 
   ```
2. Copy the `.env.example` file to `.env`:
    ```bash
    touch .env && cp .env.example .env
    ```

2. Run application with docker
    ```
    docker-compose up 
    ```


checkout for development [URL](https://localhost:80/api/v1)




## API Endpoints

1. Calculate EMI
- POST `/api/v1/emis/calculate-emi-flow`
- Request body:
    ```json
    {
        "loan_amount": 500000.00,
        "interest_rate":  8.5,
        "loan_tenure_months": 60,
        "prepayment_amount": 20000.00
    }

    ```
- Response body
    ```json
        {
            "success": true,
            "message": "EMI calculated successfully",
            "status": 200,
            "result": {
                "id": 39,
                "loan_amount": 500000,
                "interest_rate": 8.5,
                "loan_tenure_months": 60,
                "emi": 10258.27,
                "prepayment_amount": 20000,
                "monthWisePayments": [
                    {
                        "month": 1,
                        "emiPaid": 10258.27,
                        "interestPaid": 3541.67,
                        "principalPaid": 26716.6,
                        "prepayment": 20000,
                        "remainingBalance": 473283.4
                    },......]
            }
        }
    ```
2. Get All EMI Details
- **Endpoint:** `GET /api/v1/emis`
- **Parameters:**
     - `page`: number (optional, default is 1)
     - `page_size`: number (optional, default is 10)
- Response body
    ```json
        {
            "success": true,
            "message": "Emi retrieved successfully",
            "status": 200,
            "result": {
                "emis": [
                    {
                        "id": 1,
                        "loan_amount": "9999.00",
                        "interest_rate": "8.50",
                        "loan_tenure_months": 12,
                        "emi": "872.11",
                        "prepayment_amount": "0.00",
                        "remaining_balance": "0.01",
                        "createdAt": "2024-09-07T06:34:22.511Z",
                        "updatedAt": "2024-09-07T06:34:22.511Z"
                    }
                ],
                "totalItems": 7,
                "totalPages": 7,
                "currentPage": "1"
            }
        }
    ```


3. get emi details by id 
- **Endpoint:** `GET /api/v1/emis/:id`
- Response body
```json
{
    "success": true,
    "message": "Emi retrieved successfully",
    "status": 200,
    "result": {
        "id": 1,
        "loan_amount": 9999,
        "interest_rate": 8.5,
        "loan_tenure_months": 12,
        "emi": 872.11,
        "prepayment_amount": 0,
        "monthWisePayments": [
            {
                "month": 1,
                "emiPaid": 872.11,
                "interestPaid": 70.83,
                "principalPaid": 801.28,
                "prepayment": 0,
                "remainingBalance": 9197.72
            }, .....
        ]
    }
}
```

## Postman 
[Screenshots](https://drive.google.com/drive/folders/1kbZlL4l99jiauDahr4uK8rDAUPRJrfyQ)


## Project Tasks

### Completed
- [x] Implemented API endpoints:
  - [x] GET /emis
  - [x] GET /emis/calculate-emi-flow
  - [x] GET /emis/{id}
- [x] Set up Nginx with Docker
- [x] Configured PostgreSQL database
- [x] Implemented pagination for endpoints
