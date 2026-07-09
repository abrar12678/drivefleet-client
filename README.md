# DriveFleet - Vehicle Rental Platform

A modern, full-featured vehicle rental web application that allows users to browse available vehicles, manage bookings, and handle authentication seamlessly. Built with Next.js 16, React 19, and backed by MongoDB with secure authentication via Better Auth.

## Overview

DriveFleet is a scalable vehicle rental management platform designed to provide a smooth and intuitive experience for both users and administrators. The application features a clean UI powered by HeroUI and Tailwind CSS 4, real-time toast notifications, and icon-rich interfaces using Lucide and React Icons. Authentication is handled securely with Better Auth, and data persistence is managed through MongoDB.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19, HeroUI |
| Styling | Tailwind CSS 4 |
| Authentication | Better Auth (with MongoDB Adapter) |
| Database | MongoDB |
| Icons | Lucide React, React Icons |
| Notifications | React Toastify |

## Core Features

- **Vehicle Browsing** — Browse and explore available vehicles with detailed information
- **Booking System** — Book vehicles with a streamlined, user-friendly flow
- **Authentication** — Secure user registration, login, and session management via Better Auth
- **Responsive Design** — Fully responsive layout that works across all device sizes
- **Real-time Notifications** — Toast notifications for user actions and feedback
- **Modern UI** — Clean, professional interface built with HeroUI components and Tailwind CSS 4

## Dependencies

### Production

| Package | Purpose |
|---------|---------|
| `next` (16.2.6) | React framework with App Router |
| `react` (19.2.4) | UI library |
| `react-dom` (19.2.4) | React DOM renderer |
| `better-auth` (1.6.11) | Authentication system |
| `@better-auth/mongo-adapter` (1.6.11) | MongoDB adapter for Better Auth |
| `mongodb` (7.2.0) | MongoDB driver |
| `@heroui/react` (3.0.5) | UI component library |
| `lucide-react` (1.16.0) | Icon library |
| `react-icons` (5.6.0) | Additional icon set |
| `react-toastify` (11.1.0) | Toast notifications |

### Development

| Package | Purpose |
|---------|---------|
| `tailwindcss` (^4) | Utility-first CSS framework |
| `@tailwindcss/postcss` (^4) | PostCSS plugin for Tailwind |
| `eslint` (^9) | Code linting |
| `eslint-config-next` (16.2.6) | ESLint config for Next.js |
| `babel-plugin-react-compiler` (1.0.0) | React Compiler optimization |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas) running
- npm / yarn / pnpm / bun

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abrar12678/drivefleet-client.git
cd drivefleet-client

# 2. Install dependencies
npm install

# 3. Create a .env.local file and add your environment variables
# MONGODB_URI=your_mongodb_connection_string
# BETTER_AUTH_SECRET=your_auth_secret
# BETTER_AUTH_URL=http://localhost:3000
```

### Run Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [HeroUI Documentation](https://www.heroui.com/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)

---

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
</p>