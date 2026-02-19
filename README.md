# Netflix Clone

A fully responsive Netflix clone built with React.js, Firebase Authentication, and TMDB API.

## Features

### Authentication
- Firebase Authentication (Email/Password)
- Protected Routes
- Login/Signup pages with Netflix-style design
- Persistent user sessions

### Home Page
- Hero Banner with trending movie
- Movie categories (Trending, Netflix Originals, Top Rated, Action, Comedy, Horror)
- Horizontal scrolling movie rows
- Hover effects and animations
- Search functionality
- Movie modal with YouTube trailers

### UI/UX
- Exact Netflix dark theme
- Responsive design (Mobile, Tablet, Desktop)
- Loading skeletons
- Toast notifications
- Smooth animations and transitions

## Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Firebase
- **API**: TMDB API
- **Icons**: Heroicons
- **HTTP Client**: Axios

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd netflix-clone
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Get API Keys

#### TMDB API Key
1. Go to [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings > API > Request an API Key
4. Copy your API key

#### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Copy your Firebase configuration

### 4. Run the Application
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with search and user profile
│   ├── Banner.jsx          # Hero banner with trending movie
│   ├── Row.jsx             # Movie row component
│   ├── MovieCard.jsx       # Individual movie card
│   ├── MovieModal.jsx      # Movie detail modal with trailer
│   ├── LoadingSkeleton.jsx # Loading animation
│   └── Toast.jsx           # Toast notification component
├── context/
│   └── AuthContext.jsx     # Authentication context
├── hooks/
│   └── useToast.js         # Toast notification hook
├── pages/
│   ├── Landing.jsx         # Landing page
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Signup page
│   └── Home.jsx            # Main home page
├── services/
│   ├── firebase.js         # Firebase configuration
│   └── tmdb.js             # TMDB API service
├── App.jsx                 # Main app component with routing
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Features Breakdown

### Authentication Flow
1. User lands on the Landing page
2. Clicks "Get Started" → Navigate to Signup
3. Creates account with Firebase
4. Redirected to Home page (protected route)
5. Can logout and return to Login page

### Movie Discovery
- Trending movies in hero banner
- Categorized movie rows
- Search functionality
- Movie details modal with trailers
- Smooth scrolling and hover effects

### Responsive Design
- Mobile: Single column, touch-friendly
- Tablet: Optimized layouts
- Desktop: Full Netflix experience

## API Endpoints Used

- `/trending/all/week` - Trending movies and TV shows
- `/discover/tv?with_networks=213` - Netflix Originals
- `/movie/top_rated` - Top rated movies
- `/discover/movie?with_genres=28` - Action movies
- `/discover/movie?with_genres=35` - Comedy movies
- `/discover/movie?with_genres=27` - Horror movies
- `/search/multi` - Search movies and TV shows
- `/movie/{id}` - Movie details
- `/movie/{id}/videos` - Movie trailers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only. All movie data and images are provided by TMDB API.
