# Korean → Myanmar Dictionary

A beautiful, modern React-based dictionary website for translating Korean words to Myanmar (Burmese) with an enhanced user experience.

## ✨ Features

- 🌟 **Word of the Day** - Highlights a different word each day with special styling
- 🔍 **Smart Search** - Real-time search with clear visual feedback
- ❤️ **Favorites System** - Save your favorite words with animated heart button
- 🌙 **Dark/Light Mode** - Smooth theme toggle with persistent preference
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
- 💾 **Offline-Capable** - All data stored client-side in JSON
- 🎨 **Modern UI/UX** - Clean design with smooth animations and hover effects

## 🎨 Design Improvements

### Visual Enhancements
- **Modern Color Palette**: Carefully chosen colors for both light and dark modes
- **Google Fonts**: Inter for English/UI text, Noto Sans KR for Korean characters
- **Rounded Cards**: 16px border radius with subtle shadows
- **Gradient Accents**: Beautiful gradient for Word of the Day badge
- **Smooth Animations**: Hover effects, favorite button animations, and transitions

### User Experience
- **Clear Visual Hierarchy**: Word of the Day prominently displayed
- **Intuitive Search**: Search icon, clear button, and focus states
- **Interactive Elements**: Hover effects on cards, animated favorite buttons
- **Responsive Layout**: Adapts beautifully to all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Technical Features
- **CSS Variables**: Easy theme switching with CSS custom properties
- **LocalStorage**: Persists dark mode preference and favorites
- **Performance**: Optimized animations and transitions
- **Code Organization**: Clean, maintainable component structure

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
# or
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
korean-myanmar-website/
├── public/
│   ├── index.html
│   └── data/
│       └── dictionary.json          # Dictionary data
├── src/
│   ├── components/
│   │   ├── SearchBar.js             # Search input component
│   │   ├── SearchBar.css            # Search bar styles
│   │   ├── WordCard.js              # Word display component
│   │   └── WordCard.css             # Word card styles
│   ├── App.js                       # Main app component
│   ├── App.css                      # Global styles & theme
│   └── index.js                     # React entry point
├── package.json
└── README.md
```

## 🎯 Component Details

### App.js
- Manages global state (dictionary, search, dark mode, favorites)
- Handles localStorage for persistence
- Filters dictionary based on search query
- Renders Word of the Day and word list

### SearchBar Component
- Real-time search input
- Search icon and clear button
- Focus effects with border glow
- Responsive design

### WordCard Component
- Displays Korean and Myanmar text
- Favorite button with animation
- Special styling for Word of the Day
- Hover effects with elevation
- Responsive typography

## 🎨 Theme System

The app uses CSS custom properties (variables) for theming:

- **Light Mode**: Clean whites and grays with indigo accents
- **Dark Mode**: Deep blues and grays with purple accents
- **Smooth Transitions**: All color changes animate smoothly
- **Persistent**: Theme preference saved in localStorage

## 📱 Responsive Breakpoints

- **Desktop**: 800px max-width container
- **Tablet**: 768px and below
- **Mobile**: 480px and below

## 🔧 Customization

### Adding More Words
Edit `public/data/dictionary.json`:
```json
[
  { "korean": "안녕하세요", "myanmar": "မင်္ဂလာပါ" },
  { "korean": "새로운단어", "myanmar": "စကားလုံးအသစ်" }
]
```

### Changing Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --accent-primary: #4f46e5;  /* Change primary color */
  --favorite-color: #f59e0b;  /* Change favorite color */
}
```

### Modifying Fonts
Update the Google Fonts import in `src/App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap');
```

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📝 Features Explained

### Word of the Day
- Uses the current date to select a word from the dictionary
- Special gradient card design
- Animated badge with glow effect
- Always visible at the top

### Favorites System
- Click the heart button on any word card
- Favorites persist in localStorage
- Animated button with pop effect
- Visual feedback on hover

### Dark Mode
- Toggle button in header
- Smooth color transitions
- Preference saved automatically
- System-aware (can be extended)

### Search Functionality
- Case-insensitive search
- Real-time filtering
- Clear button appears when typing
- Results count display
- Empty state with helpful message

## 🎓 Learning Points

This project demonstrates:
- React hooks (useState, useEffect)
- Component composition
- CSS custom properties for theming
- LocalStorage for persistence
- Responsive design patterns
- Modern CSS animations
- Accessibility best practices

## 📄 License

This project is open source and available for educational purposes.

---

Made with ❤️ for learning Korean and Myanmar languages
