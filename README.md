# E-commerce Learning

E-commerce Learning is a React web application that brings common student learning tools into one dashboard. It is built with Vite and uses React Router for page navigation.

## Project Overview

The application includes a student dashboard with sample progress charts, course listings, notes, syllabus and exam schedule pages, a video library, YouTube learning recommendations, discussion posts, and settings. The login form is a front-end demonstration: submitting the required username and password fields opens the dashboard. There is no authentication service or database configured.

The video recommender works with sample videos by default. To request live results, configure a YouTube Data API key as described below. The rest of the displayed project data is currently sample/local UI data.

## Technology

- React 19
- Vite 6
- React Router
- Tailwind CSS and component CSS
- Recharts for dashboard charts
- Framer Motion for animations
- Lucide React icons

## Requirements

- Node.js 18 or newer
- npm

## Install and Run

From the project root, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal, usually `http://localhost:5173`.

## Available Commands

```bash
npm run dev      # Start the development server
npm run lint     # Check the source with ESLint
npm run build    # Create a production build in dist/
npm run preview  # Serve the production build locally
```

Run `npm run build` before deployment. Deploy the generated `dist/` directory to a static hosting provider configured to serve the app's `index.html` for client-side routes.

## Optional YouTube API Key

Without an API key, the video recommender displays built-in sample data. To enable live YouTube search results, create a YouTube Data API v3 key, then add it to a `.env` file in the project root:

```dotenv
VITE_YOUTUBE_API_KEY=your_api_key_here
```

Restart the Vite development server after changing environment variables. Vite exposes `VITE_` variables to browser code, so this key is not secret in a deployed client-side app. Restrict the key in Google Cloud Console to the YouTube Data API and the appropriate website referrers.

## Main Pages

- `/` - Demo login
- `/dashboard` - Student dashboard and progress overview
- `/courses` - Course catalog
- `/notes` - Learning notes
- `/syllabus` - Course syllabus
- `/exam-schedule` - Exam dates and details
- `/videolibrary` - Curated video library
- `/videorecommender` - Video recommendations and search
- `/discussion` - Learning discussion board
- `/settings` - Profile and preference UI
