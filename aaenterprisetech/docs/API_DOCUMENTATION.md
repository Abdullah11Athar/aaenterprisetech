# Complete REST API Documentation

Base URL: `https://api.paylancer.com/v1`

---

## 1. Authentication
All request headers to protected endpoints must include:
```http
Authorization: Bearer <SUPABASE_JWT_TOKEN>
Content-Type: application/json
```

---

## 2. Stripe Connect Onboarding API

### `POST /api/connect/onboard`
Initiates Stripe Connect Express onboarding for a freelancer.

#### Response (200 OK):
```json
{
  "url": "https://connect.stripe.com/express/onboarding/express_onboarding_token_123"
}
```

---

## 3. Invoice Management API

### `GET /api/invoices`
Returns a list of all invoices created by the authenticated freelancer.

#### Response (200 OK):
```json
{
  "invoices": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "invoice_number": "INV-2026-9481",
      "freelancer_id": "usr_998877",
      "client_name": "Acme Corp USA",
      "client_email": "billing@acmecorp.com",
      "status": "paid",
      "currency": "USD",
      "subtotal": 1500.00,
      "tax_rate": 0.00,
      "tax_amount": 0.00,
      "discount_amount": 0.00,
      "total_amount": 1500.00,
      "platform_fee_rate": 1.00,
      "platform_fee_amount": 15.00,
      "freelancer_net_amount": 1485.00,
      "due_date": "2026-08-15",
      "issued_date": "2026-07-30",
      "payment_link_token": "a1b2c3d4e5f67890",
      "paid_at": "2026-07-30T21:00:00Z",
      "items": [
        {
          "id": "item_101",
          "description": "Full-Stack Web Development",
          "quantity": 1,
          "unit_price": 1500.00,
          "amount": 1500.00
        }
      ]
    }
  ]
}
```

### `POST /api/invoices`
Creates a new invoice and generates a sharable payment link token.

#### Request Body:
```json
{
  "client_name": "DesignStudio London",
  "client_email": "finance@designstudio.uk",
  "client_company": "DesignStudio Ltd",
  "currency": "USD",
  "due_date": "2026-08-20",
  "tax_rate": 5.0,
  "discount_amount": 50.00,
  "items": [
    {
      "description": "UI/UX Mobile App Redesign",
      "quantity": 2,
      "unit_price": 600.00
    }
  ],
  "notes": "Thank you for your business!"
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "invoice": {
    "id": "b88c10b-99dd-4372-b567-0e02b2c3d990",
    "invoice_number": "INV-2026-8812",
    "subtotal": 1200.00,
    "tax_amount": 60.00,
    "discount_amount": 50.00,
    "total_amount": 1210.00,
    "platform_fee_amount": 12.10,
    "freelancer_net_amount": 1197.90,
    "payment_link_token": "998877665544332211"
  }
}
```

---

## 4. Webhooks API

### `POST /api/webhooks/stripe`
Receives asynchronous event notifications directly from Stripe servers.

#### Sample Payload (`checkout.session.completed`):
```json
{
  "id": "evt_3MtwB2LkdIwHu7ix08aD2m5A",
  "object": "event",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_a1b2c3d4",
      "payment_intent": "pi_3MtwB2LkdIwHu7ix08aD2m5A",
      "customer_email": "billing@acmecorp.com",
      "payment_intent_data": {
        "metadata": {
          "invoiceId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
        }
      }
    }
  }
}
```

#### Response (200 OK):
```json
{
  "received": true
}
```
