# ObsidianMate 🗒️

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Introduction

ObsidianMate is a modern, feature-rich note-taking and knowledge management application built with React and TypeScript.

## ✨ Features

- 🔒 **Secure Authentication** - Seamless login and user management with Kinde Auth
- 🎨 **Modern UI** - Clean, responsive interface built with Tailwind CSS
- ⚡ **Blazing Fast** - Built with Vite for optimal performance

## 🏗️ Project Structure

```
obsidianmate-frontend/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, and other static assets
│   ├── components/      # Reusable React components
│   │   ├── Sidebar.tsx  # Navigation sidebar component
│   │   ├── Welcome.tsx  # Welcome/landing page component
│   │   └── ...          # Other components
│   ├── contexts/        # React context providers
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/obsidianmate-frontend.git
   cd obsidianmate-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   VITE_KINDE_CLIENT_ID=your_kinde_client_id
   VITE_KINDE_ISSUER_URL=your_kinde_issuer_url
   VITE_KINDE_SITE_URL=http://localhost:5173
   VITE_KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:5173
   VITE_KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🛠️ Development

### Available Scripts

- `dev` - Start the development server
- `build` - Build the application for production
- `preview` - Preview the production build locally
- `lint` - Run ESLint for code quality checks

### Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Authentication**: Kinde Auth
- **State Management**: React Query
- **Icons**: Lucide Icons

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Kinde Auth](https://kinde.com/) for authentication
- [React Query](https://tanstack.com/query) for server state management
- [Lucide Icons](https://lucide.dev/) for the beautiful icons
