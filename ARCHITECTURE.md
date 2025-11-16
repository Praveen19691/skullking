# Skull King Scoreboard - High-Level React Architecture

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── PlayerNameForm.js    # Player name entry form
│   ├── BiddingForm.js       # Round bidding interface
│   ├── TricksForm.js        # Tricks won input form
│   ├── RoundScores.js       # Display scores for current round
│   ├── PointTable.js        # Cumulative score table
│   ├── MedalBadge.js        # Medal display component
│   ├── FinalRankings.js     # Final rankings table with medals
│   └── FinalPointTable.js   # Complete point breakdown
│
├── hooks/                # Custom React hooks
│   ├── useGameState.js      # Game state management
│   └── useValidation.js     # Form validation state
│
├── utils/                # Pure utility functions
│   └── scoring.js           # Scoring and ranking logic
│
├── App.js                # Main app with routing
├── GamePage.js           # Main game controller
├── PlayerForm.js         # Initial setup form
└── App.scss              # Global styles
```

## 🏗️ Architecture Overview

### **Separation of Concerns**

1. **Components** (`/components`)

   - Pure presentational components
   - Receive data via props
   - Emit events through callbacks
   - No business logic or state management
   - Reusable and testable

2. **Custom Hooks** (`/hooks`)

   - **useGameState**: Manages all game-related state (players, bids, scores, rounds)
   - **useValidation**: Manages validation errors and messages
   - Encapsulates stateful logic for reusability

3. **Utilities** (`/utils`)

   - **scoring.js**: Pure functions for game calculations
     - `calculateBaseScore()`: Skull King scoring algorithm
     - `getDenseRanks()`: Dense ranking algorithm (1,2,2,3)
     - `isValidNumber()`: Input validation helper

4. **Page Controllers**
   - **GamePage.js**: Orchestrates components, hooks, and utilities
   - Contains event handlers and game flow logic
   - Acts as the "smart" component

## 🔄 Data Flow

```
GamePage (Controller)
    ↓
    ├─→ useGameState Hook → Game State
    ├─→ useValidation Hook → Validation State
    └─→ scoring.js → Pure Functions
            ↓
    [Event Handlers]
            ↓
    Components (Presentational)
    ├─→ PlayerNameForm
    ├─→ BiddingForm
    ├─→ TricksForm
    ├─→ RoundScores
    ├─→ PointTable
    ├─→ FinalRankings
    └─→ FinalPointTable
```

## 📦 Component Details

### **PlayerNameForm**

- Displays input fields for player names
- Props: `playerNames`, `invalidNames`, `error`, `onNameChange`, `onSubmit`
- Handles name validation display

### **BiddingForm**

- Collects bids for current round
- Props: `playerNames`, `currentRound`, `bids`, `bidInputErrors`, `onBidChange`, `onSubmit`
- Shows max bid constraints

### **TricksForm**

- Records tricks won for current round
- Props: `playerNames`, `currentRound`, `tricksWon`, `tricksInputErrors`, `tricksError`, `onTricksChange`, `onSubmit`

### **RoundScores**

- Displays calculated scores for the round
- Props: `playerNames`, `currentRound`, `scores`, `totalRounds`, `onNextRound`
- Shows navigation to next round or final results

### **PointTable**

- Shows cumulative scores across all completed rounds
- Props: `playerNames`, `currentRound`, `scores`, `totalScores`

### **FinalRankings**

- Displays final player rankings with medals
- Props: `playerNames`, `totalScores`, `denseRanks`, `winners`
- Includes winner highlight with trophy

### **FinalPointTable**

- Complete point breakdown for all rounds
- Props: `playerNames`, `scores`, `totalScores`, `totalRounds`

### **MedalBadge**

- Reusable medal display component
- Props: `rank`
- Shows 🥇 (Gold), 🥈 (Silver), 🥉 (Bronze)

## 🎣 Custom Hooks

### **useGameState(playerCount, totalRounds)**

Returns an object with:

- State: `playerNames`, `submitted`, `currentRound`, `bids`, `tricksWon`, `scores`, `biddingDone`, `scoreDone`, `gameFinished`
- Setters: All corresponding setState functions

### **useValidation(playerCount)**

Returns an object with:

- State: `error`, `invalidNames`, `bidInputErrors`, `tricksInputErrors`, `tricksError`
- Setters: All corresponding setState functions

## 🧮 Utility Functions

### **calculateBaseScore(bid, tricksWon, round)**

Implements Skull King scoring rules:

- Correct bid (non-zero): `bid × 20`
- Incorrect bid: `|bid - tricksWon| × -10`
- Zero bid success: `round × 10`
- Zero bid failure: `round × -10`

### **getDenseRanks(scores)**

Calculates dense ranking (e.g., 1, 2, 2, 3):

- Sorts by score descending
- Assigns same rank to tied scores
- Next unique score gets next sequential rank

### **isValidNumber(value)**

Validates numeric input:

- Returns `true` for empty string or valid digits
- Returns `false` for non-numeric characters

## 🎨 Benefits of This Architecture

1. **Maintainability**: Each file has a single responsibility
2. **Testability**: Pure functions and isolated components are easy to test
3. **Reusability**: Components and hooks can be reused across the app
4. **Scalability**: Easy to add new features without affecting existing code
5. **Readability**: Clear separation makes code easier to understand
6. **Type Safety Ready**: Structure supports TypeScript migration
7. **Performance**: Can optimize individual components with React.memo

## 🚀 Future Enhancements

- Add PropTypes or TypeScript for type checking
- Implement React Context for global state
- Add unit tests for utilities and components
- Implement integration tests for game flow
- Add loading states and animations
- Persist game state to localStorage
- Add undo/redo functionality

## 📝 Code Quality

- ✅ Separation of concerns
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Composition over inheritance
- ✅ Pure functions where possible
- ✅ Predictable data flow
- ✅ Easy to debug and test
