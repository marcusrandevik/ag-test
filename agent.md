# Multiplication Game - Project Summary

## Overview

**Multiplication Game** is an interactive, educational web application designed to help students master their multiplication tables through engaging gameplay. Built as a Progressive Web App (PWA), it offers a modern, responsive interface with comprehensive features for practice, progress tracking, and performance analytics.

**Live URL**: https://multo.monster/ag-test/

## Technology Stack

- **Framework**: React 19.2.0 with Vite 7.2.2
- **Language**: JavaScript (JSX)
- **Styling**: Vanilla CSS with modular organization
- **Build Tool**: Vite with HMR (Hot Module Replacement)
- **Deployment**: GitHub Pages with automated CI/CD
- **PWA**: Service Worker for offline functionality
- **Storage**: LocalStorage for persistent data
- **Image Export**: html-to-image library for sharing results

## Project Structure

```
ag-test/
├── public/                    # Static assets
│   ├── icons/                # PWA icons (various sizes)
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   └── favicon.png/ico       # Favicons
├── src/
│   ├── components/           # React components (7 files)
│   │   ├── SelectionScreen.jsx      # Table selection interface
│   │   ├── GameScreen.jsx           # Main game interface
│   │   ├── GameResults.jsx          # Results display with sharing
│   │   ├── HistoryScreen.jsx        # Performance history & analytics
│   │   ├── ProgressChart.jsx        # Visual progress charts
│   │   ├── LanguageSwitcher.jsx     # Language selection UI
│   │   └── Grid.jsx                 # Reusable grid component
│   ├── services/             # Business logic services
│   │   ├── StorageService.js        # Game history management
│   │   ├── LocalStorageAdapter.js   # Storage abstraction
│   │   └── AudioService.js          # Sound effects management
│   ├── i18n/                 # Internationalization
│   │   ├── i18n.js                  # i18n configuration
│   │   └── locales/                 # Translation files (5 languages)
│   │       ├── en.js                # English
│   │       ├── es.js                # Spanish
│   │       ├── no.js                # Norwegian
│   │       ├── sv.js                # Swedish
│   │       └── da.js                # Danish
│   ├── styles/               # CSS modules (14 files)
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── .github/workflows/        # CI/CD configuration
│   └── deploy.yml            # GitHub Pages deployment
├── index.html                # HTML entry point with PWA meta tags
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
├── DEPLOYMENT.md             # Deployment instructions
└── FEATURE_IDEAS.md          # Future feature roadmap
```

## Core Features

### 🎮 Gameplay
- **Table Selection**: Choose from multiplication tables 1-10
- **Customizable Sessions**: Option to limit number of questions (1-99) based on number of tables selected
- **Random Question Generation**: Questions randomly selected from chosen tables
- **Real-time Feedback**: Instant visual and audio feedback on answers
- **Progress Tracking**: Visual progress bar during gameplay
- **Smart Shuffling**: Ensures all selected tables are covered

### 📊 Analytics & History
- **Game History**: Persistent storage of all completed games
- **Performance Metrics**:
  - Accuracy percentage
  - Average response time
  - Questions per minute
  - Streak tracking
- **Visual Charts**: Interactive progress visualization using custom chart component
- **Detailed Statistics**: Per-table performance breakdown
- **Historical Trends**: Track improvement over time

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, colorful interface with smooth animations
- **Cream-themed Cards**: Warm, inviting color scheme
- **Audio Feedback**: Sound effects for correct/incorrect answers
- **Keyboard Support**: Full keyboard navigation and input
- **Accessibility**: Semantic HTML and ARIA labels

### 🌍 Internationalization
Fully localized in 5 languages:
- English (en)
- Spanish (es)
- Norwegian (no)
- Swedish (sv)
- Danish (da)

Language selection persists across sessions and updates all UI elements dynamically.

### 📱 Progressive Web App (PWA)
- **Installable**: Can be installed on devices like a native app
- **Offline Support**: Full functionality without internet connection
- **Service Worker**: Caches assets for fast loading
- **App Icons**: Custom icons for all platforms
- **Manifest**: Configured for optimal PWA experience

### 🎯 Results & Sharing
- **Detailed Results Screen**: Shows accuracy, time, and performance metrics
- **Image Export**: Generate shareable result images
- **Play Again**: Quick restart with same table selection
- **Return to Menu**: Easy navigation back to selection screen

## Key Components

### App.jsx
Main application orchestrator managing:
- Game state machine (selection → playing → results → history)
- Table selection state
- Question limit configuration
- Navigation between screens

### GameScreen.jsx
Core gameplay logic:
- Question generation and shuffling
- Answer validation
- Timer tracking
- Progress calculation
- Audio feedback integration

### GameResults.jsx
Results display featuring:
- Performance summary
- Accuracy visualization
- Time statistics
- Share functionality
- Navigation options

### HistoryScreen.jsx
Analytics dashboard with:
- Game history list
- Performance charts
- Statistical analysis
- Data persistence
- Clear history option

### ProgressChart.jsx
Custom chart component:
- SVG-based visualization
- Responsive design
- Animated rendering
- Multiple chart types

### StorageService.js
Data persistence layer:
- Save game results
- Retrieve history
- Calculate statistics
- Manage localStorage
- Data validation

### AudioService.js
Sound management:
- Preload audio files
- Play sound effects
- Volume control
- Error handling

## Styling Architecture

The project uses a modular CSS approach with 14 separate style files organized by component and concern:
- Component-specific styles
- Shared utilities
- Responsive breakpoints
- Animation definitions
- Theme variables

## Deployment

### Automated CI/CD
- **Platform**: GitHub Pages
- **Trigger**: Push to main branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Build**: Vite production build
- **Deploy**: Automatic deployment to GitHub Pages

### Local Development
```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Data Persistence

All data is stored locally using `localStorage`:
- **Game History**: Complete record of all games played
- **Language Preference**: User's selected language
- **Settings**: Question limits and preferences

No backend required - fully client-side application.

## Browser Compatibility

- Modern browsers with ES6+ support
- Service Worker support for PWA features
- LocalStorage for data persistence
- Canvas/SVG for charts and visualizations

## Future Enhancements

See [FEATURE_IDEAS.md](file:///Users/mrandevik/ag-test/FEATURE_IDEAS.md) for a comprehensive roadmap including:
- Difficulty levels (easy/medium/hard)
- Additional game modes (speed, survival, challenge)
- Achievement system with badges
- Leaderboards and social features
- Smart practice with AI-powered weak spot detection
- Extended math operations (division, addition, subtraction)
- Accessibility improvements
- Theme customization

## Development Notes

- **React 19**: Uses latest React features
- **Vite**: Fast build tool with HMR for excellent DX
- **No TypeScript**: Pure JavaScript implementation
- **ESLint**: Configured with React-specific rules
- **Modular Architecture**: Clear separation of concerns
- **Service-based Design**: Business logic separated from UI

## Performance Considerations

- **Code Splitting**: Vite handles automatic code splitting
- **Asset Optimization**: Images and icons optimized for web
- **Service Worker Caching**: Fast subsequent loads
- **Lazy Loading**: Components loaded as needed
- **Minimal Dependencies**: Only essential libraries included

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Clear visual feedback
- High contrast ratios
- Responsive text sizing

---

**Project Type**: Educational Web Application (PWA)  
**Target Audience**: Students learning multiplication (ages 6-12+)  
**Status**: Production-ready, actively deployed  
**License**: Not specified  
**Last Updated**: 2025-11-19
