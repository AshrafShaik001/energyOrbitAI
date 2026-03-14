<div align="center">

# 🚀 EnergyOrbit E2E Test Automation Framework

</div>

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

**End-to-End (E2E) Automation Framework** for the **FullyInControl Web Application**

[Documentation](#project-overview) • [Setup](#setup-instructions) • [Running Tests](#running-tests)

</div>

---

## Project Overview

The FullyInControl E2E framework automates core governance, risk, and compliance workflows, including questionnaire configuration, conditional rules, cross-module integrations, task automation, and reporting using modern testing tools and best practices.

**Core Technologies:**

- **Playwright** – Cross-browser automation
- **TypeScript** – Type-safe development
- **Node.js** – Runtime environment
- **Allure** – Advanced test reporting
- **dotenv** – Configuration management

---

## Project Structure

```
FullyInControl/
├── src/
│   └── helpers/              # Reusable framework utilities
│       ├── navigationHelper.ts
│       └── uiActions.ts
├── tests/                    # Test specifications
├── reports/                  # Generated reports
├── allure-results/           # Allure data
├── .env.qa                   # Environment config
├── package.json
└── playwright.config.ts
```

📌 Built on **Page Object Model (POM)** for scalability and maintainability.

---

## Prerequisites

- **Node.js** v24+
- **Git**
- **Chrome/Firefox/WebKit** (auto-installed with Playwright)
- **NVM** (optional, recommended)

---

## Setup Instructions

### Install Node.js v24

```bash
# Using NVM (Recommended)
nvm install 24 && nvm use 24

# Verify
node -v && npm -v
```

### Clone & Install

```bash
git https://github.com/AshrafShaik001/EnergyOrbit
cd FullyInControl
npm install && npx playwright install
```

### Configure Environment

Create `.env.qa`:

```env
BASE_URL=https://qualitlabs.incontrol.zone/
EMAIL=your_email_here
PASSWORD=your_password_here
```

> ⚠️ Never commit real credentials to version control.

---

## Running Tests

```bash
npm run clean-reports           # Clean previous reports
npm run mac:test:qa             # Execute tests
npm run report                  # Generate Allure report
open ./allure-report/index.html # View results
```

---

## Reporting with Allure

Comprehensive test insights including:

- Test summaries & trends
- Step-by-step execution logs
- Screenshots & failure details
- Performance metrics

---

## Best Practices

✔ Page Object Model | ✔ Type Safety | ✔ Reusable Components | ✔ Centralized Config | ✔ CI/CD Ready | ✔ Clean Logging
