# Annadhan - Food Donation & Distribution Platform

> **"No meal should go wasted, no hand should go empty"**

**Annadhan** is a full-stack, tech-enabled humanitarian web platform designed to eliminate food waste and fight hunger. It bridges surplus food donors (restaurants, banquet halls, events, individuals) with local volunteer rescue networks for rapid delivery to verified families and shelter homes.

---

## 🚀 Key Features

* 🍲 **Food Donation Portal**: Donors submit food type, meal quantities, preparation details, and pickup addresses.
* 🚴 **Volunteer Rescue Network**: Volunteer registration, login, and active task dashboard with status updates.
* 🛡️ **Admin Control Panel**: Comprehensive administrative dashboard (`admin@annadhan.com` / `admin123`) featuring live impact stats, manual & automated volunteer task assignments, and recipient management.
* 👨‍👩‍👧‍👦 **Verified Recipients Catalog**: Manage verified families and shelters with location and family size tracking.
* 💖 **Monthly Donor Circle**: Micro-subscription program (₹400/month) funding continuous logistics operations.
* 📊 **Real-time Impact Metrics**: Transparent statistical tracking of rescued food parcels, active volunteers, and completed deliveries.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
* **Framework**: React 18 (Vite) Single Page Application (SPA)
* **Styling**: Tailwind CSS & Lucide Icons
* **Routing**: React Router DOM v6

### **Backend (Dual Architecture)**
1. **Primary Enterprise API**: **C# .NET 8 ASP.NET Core Web API** ([`Annadhan.Api/`](file:///c:/Users/dilee/Downloads/annasamarpan-main/annasamarpan-main/annadhan/Annadhan.Api))
   * Official `MongoDB.Driver` integration
   * Interactive Swagger / OpenAPI documentation UI
   * Strongly-typed BSON data models & C# API controllers
2. **Lightweight Runtime API**: **Python 3 / Flask REST API** ([`app.py`](file:///c:/Users/dilee/Downloads/annasamarpan-main/annasamarpan-main/annadhan/app.py))
   * Cross-Origin Resource Sharing (`Flask-CORS`) enabled
   * Automatic in-memory mock database fallback

### **Database**
* **MongoDB**: Document database storing collections (`donors`, `volunteers`, `recipients`, `donations`, `assignments`, `monthly_donors`).

---

## 🏁 Quick Start & Running the Application

### 1. Prerequisites
* [Node.js (v18+)](https://nodejs.org/) & `npm`
* Python (v3.8+) or [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* MongoDB (Optional, in-memory mock DB acts as fallback)

---

### 2. Running the Application

#### **Step A: Start the Backend API**

**Option 1: Running the Python Flask REST API**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask REST API
python app.py
```
*API Base URL*: `http://localhost:5000`

**Option 2: Running the C# .NET 8 Web API**
```bash
cd Annadhan.Api
dotnet run
```
*API Base URL*: `http://localhost:5000` (or `http://localhost:5242`)  
*Swagger API Docs*: `http://localhost:5000/swagger`

---

#### **Step B: Start the React Frontend**

```bash
# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev
```
*Access Frontend in Browser*: **`http://localhost:5173`**

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@annadhan.com` | `admin123` |

---

## 📂 Repository Structure

```
annadhan/
├── src/                        # React Frontend Source Code
│   ├── components/             # Reusable UI (Navbar, Footer, StatCard)
│   ├── pages/                  # Page Components (Home, Donor, Volunteer, Admin, etc.)
│   ├── App.jsx                 # Client-side router setup
│   └── main.jsx                # React DOM entrypoint
├── Annadhan.Api/               # C# .NET 8 ASP.NET Core Web API
│   ├── Controllers/            # C# REST Controllers (Stats, Donor, Volunteer, Admin, etc.)
│   ├── Models/                 # Strongly-typed BSON Data Models
│   ├── Services/               # MongoDbService DI Container
│   ├── Program.cs              # ASP.NET Core Middleware & Swagger
│   └── Annadhan.Api.csproj     # C# Project File
├── app.py                      # Flask REST API Server
├── package.json                # React NPM Dependencies
├── vite.config.js              # Vite dev server configuration with API proxy
└── tailwind.config.js          # Tailwind CSS design system settings
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
