# NotifyBot

A REST notification service that sends messages to Telegram, built with **Hexagonal Architecture**, **SOLID principles**, and developed using **TDD** (Test-Driven Development).


## What is this project?

NotifyBot exposes a REST endpoint that receives a message and delivers it to a Telegram chat. It was built as a learning project to practice clean architecture patterns commonly used in multichannel messaging platforms.


## Architecture

This project follows **Hexagonal Architecture** (Ports & Adapters), where the domain is completely isolated from external dependencies.

```
src/
├── domain/           # Core business logic — no external dependencies
│   ├── Message.ts         # Message entity with validations
│   ├── MessageSender.ts   # Output port (interface)
│   ├── AppError.ts        # Typed error hierarchy
│   └── ErrorMessages.ts   # Centralized error message constants
├── application/      # Use cases — orchestrates the domain
│   └── SendMessage.ts     # Send message use case
├── infrastructure/   # Output adapters — external services
│   └── TelegramSender.ts  # Telegram API adapter
├── controllers/      # Input adapters — HTTP layer
│   └── NotifyController.ts # REST controller for POST /notify
└── config/           # Environment configuration
    └── Config.ts          # Startup env var validation
```

### Dependency rule

Dependencies always point **inward**. The domain knows nothing about Telegram, Express, or any external library.

```
Controllers -> Application -> Domain <- Infrastructure
```

### Why Hexagonal Architecture?

Adding a new channel (WhatsApp, SMS) only requires creating a new adapter that implements `MessageSender`. The domain and use cases remain untouched — this is the **Open/Closed Principle** in practice.


## SOLID Principles Applied

| Principle | Where |
|-----------|-------|
| **S** — Single Responsibility | Each class has one reason to change |
| **O** — Open/Closed | New channels via new adapters, no existing code modified |
| **L** — Liskov Substitution | Any `MessageSender` implementation is interchangeable |
| **I** — Interface Segregation | `MessageSender` exposes only what's needed |
| **D** — Dependency Inversion | `SendMessage` depends on the interface, not `TelegramSender` |


## Requirements

- Node.js v18+
- npm
- A Telegram bot token (see setup below)


## Installation

```bash
git clone https://github.com/karen15367/notifybot.git
cd notifybot
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```
TELEGRAM_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### How to get these values

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the instructions to get your `TELEGRAM_TOKEN`
3. Start a conversation with your bot, then visit:
   ```
   https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
4. Find the `"id"` field inside `"chat"` — that is your `TELEGRAM_CHAT_ID`

> The server will not start if any required variable is missing, and will tell you exactly which one.



## Running the server

```bash
npm start
```

The server will start on port `3000` by default.


## API

### `POST /notify`

Sends a message to the configured Telegram chat.

**Request body:**
```json
{
  "text": "Hello from NotifyBot!",
  "recipientId": "karen_123"
}
```

**Success response `200`:**
```json
{
  "message": "Message sent successfully"
}
```

**Error response `400`:**
```json
{
  "error": "text and recipientId are required"
}
```

**Example with curl:**
```bash
curl -X POST http://localhost:3000/notify \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Hello!\", \"recipientId\": \"karen_123\"}"
```


## Running the tests

**Unit tests only:**
```bash
npm test
```

**Integration tests (requires valid `.env`):**
```bash
npm run test:integration
```

### Test coverage by layer

| Layer | File | Tests |
|-------|------|-------|
| Domain | `Message.test.ts` | Entity validation |
| Domain | `AppError.test.ts` | Error hierarchy |
| Domain | `ErrorMessages.test.ts` | Constants |
| Application | `SendMessage.test.ts` | Use case behavior |
| Controllers | `NotifyController.test.ts` | HTTP responses |
| Config | `Config.test.ts` | Env var validation |
| Infrastructure | `TelegramSender.integration.test.ts` | Real Telegram API |


## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Testing:** Jest + ts-jest + Supertest
- **Telegram:** node-telegram-bot-api
- **Config:** dotenv