# Spendrift — markdown mirror of the marketing site

This file is a plain-text mirror of the public pages so tools and models can read the same content as the HTML site without rendering React.

| Route | Role |
|-------|------|
| `/` | Home (landing) |
| `/privacy_policy` | Privacy Policy |
| `/llms.txt` | Compact site index for LLM crawlers |
| `/index.md` | This document |

---

## Site metadata

- **Title:** Spendrift  
- **Description:** Your finances, on your device. Simple, private, and always in your control.

---

## Home (`/`)

### Hero

- **Badge:** Now available on the App Store  
- **Headline:** Your money, **understood.** (the word *understood* is styled as a gradient in the UI)  
- **Subhead:** Built to bring ease in expense tracking. Upload your bank statements, speak your expenses or track them without ever opening the app.  
- **Stats (desktop):** 4.9★ App Store rating · 100% On-device private · Free to download  
- **Primary action:** App Store download (see [Product links](#product-links)).  
- **Footer (desktop):** Built by Ronak. Copyright 2026 spendrift.  
- **Nav:** Links to Privacy Policy (`/privacy_policy`), Contact (`mailto:me@ronakpunase.dev`).  
- **Layout notes:** Desktop uses a scroll-driven feature story beside a phone mockup with screen recordings; mobile uses a simplified layout with a hero video and condensed copy.

### Feature story panels

Each panel has a **tag**, **headline**, and **body** as shown on the site.

#### 1. Smart Budgeting

- **Headline:** Create transactions with ease.  
- **Body:** Type out your transactions with ease and save it forever.

#### 2. Expense Tracking

- **Headline:** Top Tier Accessibility.  
- **Body:** Add accessibility shortcuts to your action button or double/triple tap that make your life easier.

#### 3. Savings Goals

- **Headline:** Type Expense Shortcut.  
- **Body:** Record expense without ever opening your app.

#### 4. Insights & Reports

- **Headline:** Voice Expenses.  
- **Body:** Directly speak an expense via the voice expense shortcut or via the speak feature and have your expenses be recorded magically.

#### 5. Import Statements

- **Headline:** Missed Several Expenses?  
- **Body:** Record everything by simply upload your bank statement.

#### 6. Analytics

- **Headline:** Insightful and Beautiful  
- **Body:** Beautiful analytics UI that tells you everything about your app.

---

## Privacy Policy (`/privacy_policy`)

**Last updated:** April 8, 2026

**Intro:** This Privacy Policy describes how Spendrift ("we," "our," or "us") handles information when you use the Spendrift mobile application (the "App"). By using the App, you agree to this policy.

### Contents

1. [Summary](#1-summary)  
2. [Data Stored on Your Device and iCloud](#2-data-stored-on-your-device-and-icloud)  
3. [Third-Party AI Services](#3-third-party-ai-services)  
4. [Import Statement Feature](#4-import-statement-feature)  
5. [Voice and Other AI-Assisted Entry](#5-voice-and-other-ai-assisted-entry)  
6. [What We Do Not Do (Transaction Database)](#6-what-we-do-not-do-transaction-database)  
7. [Security](#7-security)  
8. [Changes](#8-changes)  
9. [Contact](#9-contact)

### 1. Summary

Spendrift is designed so your day-to-day financial records—such as transactions, accounts, and categories—are stored on your device. We do not operate our own servers to collect or host that database for you.

Some optional features send content you choose (for example a bank statement file or a voice recording) to independent third-party artificial intelligence ("AI") services so the App can interpret that content and help you enter transactions. Those providers process the data you send according to their own policies.

### 2. Data Stored on Your Device and iCloud

Your transaction history and related information you save in Spendrift are kept in local storage on your device (the App's on-device database). Spendrift does not upload that database to servers we control or to other third-party backends for the purpose of storing your financial records on our behalf.

If you use Apple's iCloud services (for example iCloud Backup or other device backup and sync features available for your Apple ID), copies of your App data may be included in your personal iCloud account as part of how Apple backs up or syncs data across your devices. That handling is governed by Apple's privacy practices and your device and Apple ID settings—not by Spendrift operating a separate cloud copy of your data on non-Apple servers.

### 3. Third-Party AI Services

The App uses third-party AI models to power certain features. We do not name individual providers here; those providers may change over time. When you use a feature that relies on AI, the minimum content needed to perform that feature is sent to the AI provider over the network.

### 4. Import Statement Feature

Spendrift offers an optional "Import Statement" (or similar) flow that lets you select a bank or card statement file (for example a PDF) so the App can suggest transactions to add.

> **Important:** Bank statements can contain highly sensitive information, including but not limited to account details, balances, merchant names, and transfer descriptions. When you use this feature, the statement file you select is transmitted to a third-party AI service so it can read the document and return structured suggestions (such as amounts, dates, and descriptions). That means sensitive information contained in the file may leave your device and be processed by the AI provider.

The App requires you to acknowledge this before you can proceed with import. You should only use this feature if you accept that risk. We are not responsible for the AI provider's processing, retention, or security practices; you should review that provider's terms and privacy policy where available.

### 5. Voice and Other AI-Assisted Entry

If the App offers voice or similar input that is interpreted by AI, your audio (or other input) is sent to a third-party AI service for processing so the App can extract transaction details. Do not use these features with recordings that include information you are unwilling to share with an external AI provider.

### 6. What We Do Not Do (Transaction Database)

Except as described in Sections 3–5 for the specific content you send for AI processing, Spendrift does not store your complete transaction database on third-party application servers for our own centralized hosting of your financial data. Routine use of the App—adding, editing, and viewing transactions—relies on your on-device store and, where applicable, Apple's iCloud services tied to your account as described above.

### 7. Security

We design the App to keep your data under your control on your device. No method of electronic storage or transmission is completely secure. You are responsible for protecting access to your device and your Apple ID.

### 8. Changes

We may update this Privacy Policy from time to time. The "Last updated" date at the top will change when we do. Continued use of the App after changes means you accept the updated policy.

### 9. Contact

If you have questions about this Privacy Policy, contact us at: **me@ronakpunase.dev**

**Policy page footer:** © 2026 Spendrift. All rights reserved.

---

## Product links

- **App Store:** https://apps.apple.com/us/app/spendrift/id6761763507

---

## Maintenance note for editors

When you change copy in `app/components/LandingPage.tsx`, `app/layout.tsx`, or `app/privacy_policy/page.tsx`, update this file so the markdown mirror stays accurate.
