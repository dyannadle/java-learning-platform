# Java Learning Platform

A comprehensive, interactive platform for mastering Java, built with React, TypeScript, and TailwindCSS.

![Platform Preview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop)

## 🚀 Features

### Phase 1: Foundation
-   **Interactive Learning Path**: Modules 1-8 covering Java basics to Concurrency.
-   **Code Playground**: Real-time Java code editor with secure execution.
-   **Visualizations**: Animated diagrams for Memory, OOP, and Data Structures.

### Phase 2: Engagement
-   **Quiz System**: Test your knowledge at the end of each module.
-   **Advanced Topics**: New modules for File I/O (Strategies) and Generics.
-   **Project Blueprints**: Detailed guides for building real-world apps (Console Bank, Chat App, etc.).
-   **Glossary**: Searchable dictionary of Java terms with deep dives.

### Phase 3: Cloud & Auth
-   **User Accounts**: Sign Up/Login powered by Supabase.
-   **Cross-Device Sync**: Progress is saved to the cloud and synced across devices.
-   **Hybrid Storage**: Start as a guest, merge progress when you sign up.

### Phase 4: Advanced Features (Completed)
-   **Real-Time Code Execution**: Run actual Java code securely via Piston API (supports stdout/stderr).
-   **Gamification**: Earn XP, level up, and maintain streaks.
-   **Design Patterns Module**: Interactive visualizations for Singleton, Factory, Observer, Strategy, and Builder patterns.

## 🔮 Future Roadmap
See [FUTURE_FEATURES.md](./FUTURE_FEATURES.md) for the long-term vision, including:
-   Spring Boot & Enterprise Java
-   AI Tutor Integration
-   Mobile Optimization
-   Advanced Concurrency

## 🛠️ Tech Stack
-   **Frontend**: React 18, TypeScript, Vite
-   **Styling**: TailwindCSS 4, Framer Motion
-   **Icons**: Lucide React
-   **Auth/DB**: Supabase

## 🏃‍♂️ Running Locally

1.  Clone the repo
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    -   Copy `.env.example` to `.env`
    -   Add your Supabase URL and Anon Key
4.  Run the development server:
    ```bash
    npm run dev
    ```

## 📦 Deployment

The project is ready for deployment on Vercel or Netlify.
Ensure you add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your deployment environment variables.
