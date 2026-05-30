# 🏠 OneRoom - Website

> The Ultimate Roommate Management App - Marketing Website

[![Firebase](https://img.shields.io/badge/Firebase-Integrated-orange?logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Overview

This is the marketing website for **OneRoom**, the all-in-one roommate management application. The website showcases app features, displays real-time statistics from Firebase Firestore, and provides download links for iOS and Android.

It also features a complete interactive feature sandbox on the **How it Works** page and an advanced context-aware AI Chatbot (**Roomy**) powered by Gemini to help prospective users understand the application's features and founder's story.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase project set up
- Gemini API Key (optional, for chatbot functionality)
- npm or yarn package manager

### Installation & Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/oneroom-website.git
   cd oneroom-website/Website
   ```

2. **Configure Environment Variables**
   Create a `.env` file at the root of the `Website/` directory (see the [Environment Setup](#-environment-setup) section below).

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to see the website!

---

## 🔑 Environment Setup

The website uses a git-ignored `.env` file at the root to store Firebase credentials and the Gemini API key securely. **Never commit the `.env` file to version control.**

Create a `.env` file in the root `Website/` directory with the following variables:

```env
# Gemini API Configuration (for Chatbot Roomy)
VITE_GEMINI_API_KEY="your-gemini-api-key-here"

# Firebase Client Configuration (for Real-time Stats)
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-app-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-web-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

In the codebase, these parameters are securely accessed dynamically using:
* `import.meta.env.VITE_GEMINI_API_KEY`
* `import.meta.env.VITE_FIREBASE_API_KEY`, etc.

---

## ✨ Key Features & Interactive Sandboxes

The website provides a hands-on preview of how OneRoom operates through live interactive sandboxes:

### 1. 📋 Multi-Step How It Works Pager
Located on the **How It Works** page, this interactive stepper contains functional previews of the core app workflows:
* **Step 1: Invite Flatmates**: Enter roommate names to simulate invite link creation. Learn how users can scan room QR codes to join rooms instantly.
* **Step 2: House Constitution**: Interactive toggles for quiet hours, visitor policy notifications, and common supplies. Roommates sign off on rules to create a consensus banner.
* **Step 3: Chore Board**: Set up chores, assign tasks, rotate them dynamically with the **Rotate Chores** scheduler, and trigger roommate notifications using the **Nudge Roommate** feature.
* **Step 4: Ledger & Sync**: Includes three advanced sub-tabs:
  * **Bill Split**: Log expenses, select a payer, and auto-split balances equally with quick "Settle Up" functionality.
  * **Trip Media Folder**: Upload photos/videos for group trips (e.g., Goa Trip) with a built-in **30-day auto-delete warning** that helps save local storage space while giving everyone time to download.
  * **Personal Wallet**: View a personal budget dashboard. Showcases **Auto-Sync** technology aggregating transactions dynamically across all rooms and roadtrips (e.g. Greenwood Room, Goa Roadtrip) into a single personal ledger.

### 2. 🤖 AI Chatbot Assistant (Roomy)
A persistent AI helper bubble in the bottom right corner of the website:
* **Gemini Powered**: Uses the client-side Gemini API initialized securely with the local environment key.
* **Deep Context**: Injected with a complete structure of the website, support contact numbers (`+91 8279677833`), pricing plans, Play Store links, and founder Mohd Raza Khan's CSE B.Tech background story.
* **Smart Fallbacks**: Features NLP offline handling if API connections are interrupted.

### 3. 🌐 i18n Translation Ready
Built-in lightweight internationalization helper (`src/utils/i18n.js`) wrapping JSX nodes in `{t('text')}`. Facilitates future translations and cleans up hardcoded JSX string warnings.

### 4. 📊 Real-time Statistics
Displays live metrics pulled directly from Firestore:
* **Active Users** - Live registered user count
* **Expenses Tracked** - Total money tracked (in ₹)
* **Tasks Completed** - Live checklist count
* **Satisfaction Rate** - User rating average

---

## 📁 Project Structure

The React application is situated directly at the root of the `Website/` directory:

```
Website/
├── .env                        # Local environment credentials (Git ignored)
├── .gitignore                  # Git ignore configurations (protects credentials)
├── index.html                  # HTML entry point
├── jsconfig.json               # Compiler casing & type check settings
├── vite.config.js              # Vite build configuration
├── package.json                # Project dependencies and scripts
├── public/                     # Static public assets (images, icons)
├── src/
│   ├── App.jsx                 # Application Router & Base Layout
│   ├── main.jsx                # React DOM Mount Entry
│   ├── index.css               # Main global stylesheet
│   ├── components/             # Reusable UI components
│   │   ├── ChatWidget.jsx      # AI Chatbot bubble (Roomy)
│   │   ├── Header.jsx          # Site Navbar (i18n enabled)
│   │   ├── Footer.jsx          # Site Footer
│   │   ├── FeaturesBento.jsx   # Feature grid styling
│   │   ├── Stats.jsx           # Firebase live stats widget
│   │   └── ...
│   ├── pages/                  # Route level page views
│   │   ├── Home.jsx            # Home Page
│   │   ├── HowItWorksPage.jsx  # Interactive Stepper/Pager Page
│   │   ├── FeaturesPage.jsx    # Expanded Feature Showcase Cards
│   │   ├── PricingPage.jsx     # App Subscription Pricing & Promos
│   │   └── ...
│   ├── config/
│   │   ├── firebase.js         # Firebase config reading from environment
│   │   └── websiteContext.js   # Chatbot system context definition
│   ├── utils/
│   │   └── i18n.js             # Language translation helper function
│   └── styles/                 # Helper CSS sheets
└── functions/                  # Cloud Functions for scraping/aggregating stats
    ├── index.js                # Stats scheduler and Play Store scraper
    └── package.json
```

---

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build static files for production (into dist/)
npm run preview      # Preview local production build
npm run lint         # Check for code linting errors
```

### Deployment
```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🎨 Tech Stack

* **Frontend**: React 19.2.0, React Router, Vanilla CSS (harmonious gradients, modern typography, glassmorphism, responsive breakpoints)
* **Build Tool**: Vite 7.2.4
* **AI Engine**: Google Gemini API via `@google/generative-ai`
* **Backend**: Firebase Firestore (real-time stats db), Firebase Hosting, Node.js Firebase Cloud Functions (automation)

---

## 📖 Documentation Reference

| Document | Description |
|----------|-------------|
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Complete implementation details of firebase stats and function aggregators |
| [firebase.json](firebase.json) | Firebase CLI Hosting and Functions rules configuration |
| [firestore.rules](firestore.rules) | Security permissions for Firestore databases |

---

## 🔒 Security & Safety

1. **Credentials Safety**: The `.env` file holds credentials and is git-ignored. Codebase files use `import.meta.env` dynamically. Never commit `.env` or raw key secrets.
2. **Access Rules**: Firestore Security Rules (`firestore.rules`) enforce read-only public access to `appStats/global` and block unauthorized writes.
3. **Scan Optimization**: A `.vscode/settings.json` is configured to exclude `dist/` build folders from editor indexes to avoid unnecessary processor loads and minified script alerts.

---

**Made with ❤️ for OneRoom**
*Simplifying shared flat living, one flatmate at a time.*
