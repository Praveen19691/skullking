# 🏴‍☠️ Skull King Scoreboard

A modern, responsive web application for tracking scores in the popular card game **Skull King**. Built with React, this app simplifies game management by automatically calculating scores, tracking bids and tricks, and determining winners.

![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat&logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.8.2-ca4245?style=flat&logo=react-router)
![SASS](https://img.shields.io/badge/SASS-1.91.0-cc6699?style=flat&logo=sass)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## 📖 About Skull King

Skull King is a trick-taking card game where players bid on the number of tricks they'll win each round. This scoreboard application helps you:

- ✅ Track multiple players (2-10 players supported)
- ✅ Manage multiple rounds (2-10 rounds configurable)
- ✅ Automatically calculate scores based on official Skull King rules
- ✅ View bidding history and tricks won across all rounds
- ✅ Display final rankings with medals for top 3 players
- ✅ Validate input to ensure fair gameplay

## 🎲 Game Rules

### Overview

Skull King is a pirate-themed trick-taking game where players predict how many tricks they'll win each round. The game typically lasts 10 rounds, with the number of cards dealt increasing each round (1 card in round 1, 2 cards in round 2, etc.).

### Setup

- **Players**: 2-10 players
- **Rounds**: Usually 10 rounds (configurable in this app: 2-10 rounds)
- **Cards per Round**: Round number = cards dealt (Round 1 = 1 card, Round 10 = 10 cards)

### How to Play

#### 1. Bidding Phase

- After looking at their cards, each player **bids** on the number of tricks they expect to win
- Bids can range from **0** to the **round number**
- A bid of **0** is called "going for zero" and has special scoring rules
- All bids are recorded before play begins

#### 2. Playing Tricks

- The starting player leads with any card
- Other players must follow suit if possible
- If unable to follow suit, any card may be played
- The highest card of the led suit wins the trick (unless special cards are played)
- The winner of each trick leads the next trick

#### 3. Special Cards (Not tracked in this app)

While this scorekeeper focuses on bids and tricks, the actual game includes:

- **Skull King**: Beats all cards except Mermaids
- **Pirates**: Beat number cards but lose to Skull King
- **Mermaids**: Beat Pirates and Skull King
- **Escape Cards**: Always lose tricks
- **Tigress (Expansion)**: Can be played as any suit

### Scoring (Implemented in this app)

#### Bidding Zero (0 tricks)

- **Success**: Round number × 10 points
  - Example: Bid 0 and won 0 tricks in Round 5 = **50 points**
- **Failure**: Round number × -10 points
  - Example: Bid 0 but won 1 trick in Round 5 = **-50 points**

#### Bidding One or More Tricks

- **Correct Bid**: Bid × 20 points
  - Example: Bid 3 and won 3 tricks = **60 points**
- **Incorrect Bid**: |Bid - Actual| × -10 points
  - Example: Bid 4 but won 2 tricks = |4-2| × -10 = **-20 points**
  - Example: Bid 2 but won 5 tricks = |2-5| × -10 = **-30 points**

#### Bonus Points (Not implemented in this app)

The physical game includes bonus points for:

- Capturing Pirates with Skull King
- Capturing Skull King with Mermaids
- Winning with Loot cards (14s)

### Winning the Game

- After all rounds are complete, the player with the **highest total score** wins
- This app displays:
  - 🥇 Gold medal for 1st place
  - 🥈 Silver medal for 2nd place
  - 🥉 Bronze medal for 3rd place
  - Final rankings with complete score breakdown

## 🎮 Features

### Game Flow

1. **Player Setup**: Enter 2-10 player names with validation
2. **Bidding Phase**: Each player bids on tricks they'll win (0 to round number)
3. **Tricks Recording**: Record actual tricks won by each player
4. **Score Calculation**: Automatic scoring based on Skull King rules
5. **History Tracking**: View all bids, tricks, and scores across rounds
6. **Final Rankings**: See winners with medals and complete point breakdown

### Scoring Rules

- **Correct Bid (0 tricks)**: Round number × 10 points
- **Correct Bid (1+ tricks)**: Bid × 20 points
- **Incorrect Bid**: Difference × -10 points

### User Experience

- 🎯 **Responsive Design**: Works on desktop, tablet, and mobile
- ⌨️ **Input Validation**: Clear on focus, real-time error checking
- 🚫 **Smart Buttons**: Disabled until all inputs are filled
- 📊 **Tab Navigation**: Organized views for current round, history, and scores
- 🎨 **Modern UI**: Dark theme with gold/orange accents
- 🏆 **Visual Feedback**: Medals, highlights, and trophy for winners

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Praveen19691/skullking.git
   cd skullking
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will reload when you make changes

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

## 🏗️ Project Structure

```
skullking/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # React components
│   │   ├── BiddingForm/        # Bidding input form
│   │   ├── TricksForm/         # Tricks won input form
│   │   ├── RoundScores/        # Round score display
│   │   ├── PointTable/         # Cumulative score table
│   │   ├── BiddingTricksTable/ # Combined history view
│   │   ├── FinalRankings/      # Winner rankings
│   │   ├── FinalPointTable/    # Complete game breakdown
│   │   ├── PlayerNameForm/     # Player name entry
│   │   ├── PlayerInputTable/   # Reusable input table
│   │   ├── ScoreDisplayTable/  # Reusable score display
│   │   ├── GameInput/          # Reusable input component
│   │   ├── MedalBadge/         # Medal display component
│   │   └── Tabs/               # Tab navigation component
│   ├── hooks/                  # Custom React hooks
│   │   ├── useGameState.js     # Game state management
│   │   ├── useValidation.js    # Form validation state
│   │   └── useGameTabs.js      # Tab configuration
│   ├── utils/                  # Utility functions
│   │   └── scoring.js          # Scoring calculations
│   ├── App.js                  # Root component with routing
│   ├── GamePage.js             # Main game orchestrator
│   ├── PlayerForm.js           # Initial setup form
│   └── App.scss                # Global styles
├── package.json
└── README.md
```

## 🎨 Technology Stack

- **React 19.1.1**: Modern UI library with hooks
- **React Router 7.8.2**: Client-side routing
- **SASS 1.91.0**: Advanced CSS with variables and nesting
- **Create React App**: Build tooling and configuration

## 📱 Responsive Design

- **Desktop**: Full-width tables with all features
- **Tablet**: Optimized layouts with horizontal scrolling
- **Mobile**: Compact views with reduced padding and font sizes
- **Dynamic Tables**: Adjust to 2-10 players automatically

## 🎯 Code Quality

- ✅ Component-based architecture with single responsibility
- ✅ Custom hooks for state and logic separation
- ✅ Utility functions for pure calculations
- ✅ Comprehensive JSDoc documentation
- ✅ Reusable components to reduce code duplication
- ✅ Clean file structure without barrel exports
- ✅ SASS modules for scoped styling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Praveen**

- GitHub: [@Praveen19691](https://github.com/Praveen19691)

## 🙏 Acknowledgments

- Skull King card game by Grandpa Beck's Games
- React community for excellent documentation
- Create React App for streamlined setup
