# 🕹️ Spot the Difference Game

A fun, interactive “Spot the Difference” game built with **Next.js**, **Tailwind CSS**, **TypeScript**, and **Framer Motion** — fully configurable with a simple JSON file.

---

## 🎮 **Features**

✅ Two images side-by-side — find all differences!  
✅ JSON-based configuration for images & hotspots — no hardcoding.  
✅ Click to spot differences — shows animated circles for feedback.  
✅ Tracks correct and incorrect clicks.  
✅ Arcade-style **countdown timer** with flicker & screen alert in the last 3 seconds.  
✅ Progress bar that fills up as you find more spots.  
✅ Confetti and stars on completion.   
✅ Fully responsive for mobile & desktop.  
✅ Clean, modular React components.

---

## 📁 **Project Structure**

```
📦 spot-the-difference/
├── hooks/
│   └── usespot.tsx              # Custom hook with game logic and state
│
├── components/
│   ├── header.tsx               # Game header (title + timer display)
│   ├── images.tsx               # Image pair + clickable canvas overlays
│   ├── result.tsx               # Result modal with score, stars, restart
│   ├── progressbar.tsx          # Progress bar component
│   ├── timer.tsx                # Timer component with flicker effect
│   └── helpers.tsx              # Shared helper functions (finish, restart, stars)
│
├── public/
│   ├── images/
│   │   ├── image1.png
│   │   └── image2.png
│   └── config.json              # JSON config for images and hotspots
│
├── app/
│   ├── page.tsx                 # Main page that ties everything together
│   └── globals.css              # Tailwind global styles
│
├── package.json
├── next.config.js
└── README.md

````
---

## ⚡ **Getting Started**

### ✅ **1. Install Dependencies**

```bash
npm install
```

### ✅ **2. Run the Dev Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🚀 **Build & Deploy**

### **Build for Production**

```bash
npm run build
npm run start
```
---

## 🙌 Tech Stack

This project leverages modern React ecosystem tools to deliver a fast, interactive, and maintainable experience:

- **Next.js App Router** — built on React for seamless server/client rendering, file-based routing, and powerful data fetching.  
- **React Hooks & Functional Components** — for clean, modular, and reusable UI logic (e.g., custom `useSpotGame` hook managing game state).  
- **Tailwind CSS** — utility-first styling integrated with React for rapid UI development and responsive design without leaving JSX.  
- **Framer Motion** — React-powered animation library to create smooth, declarative motion effects (click feedback, confetti, modal transitions).  
- **TypeScript** — adds static typing on top of React for safer, more scalable code and improved developer experience.

---

```