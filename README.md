# Tic Tac Toe Game

A classic Tic Tac Toe game built with HTML, CSS, and JavaScript using the module pattern and factory functions.

## Features

- Two-player gameplay with customizable player names
- Interactive game board with hover effects
- Win detection for all possible winning combinations
- Tie game detection
- Game status display showing current player
- Restart and new game functionality
- Responsive design that works on all devices

## Architecture

This project follows a clean architecture pattern with three main modules:

### Gameboard Module (IIFE)
- Manages the 3x3 game board as an array
- Handles cell placement and validation
- Contains win/tie detection logic
- Provides board state through public methods

### Player Factory
- Creates player objects with name and marker (X/O)
- Simple factory function for player creation

### GameController Module (IIFE)
- Manages game flow and player turns
- Handles game start, restart, and end states
- Coordinates between Gameboard and DisplayController
- Maintains game state and active status

### DisplayController Module (IIFE)
- Handles all DOM interactions and updates
- Renders the game board based on current state
- Manages UI elements (buttons, status display)
- Provides user input handling

## Technologies Used

- **HTML5**: Semantic structure and game board layout
- **CSS3**: 
  - Flexbox and Grid for responsive layout
  - CSS transitions and hover effects
  - Gradient backgrounds and modern styling
- **JavaScript**:
  - Module pattern (IIFE) for encapsulation
  - Factory functions for object creation
  - Event delegation for cell clicks
  - Array methods for game logic

## How to Play

1. Enter names for both players (Player X and Player O)
2. Click "Start Game" to begin
3. Players take turns clicking on empty squares
4. The first player to get 3 in a row (horizontally, vertically, or diagonally) wins
5. If all squares are filled with no winner, the game ends in a tie
6. Use "Restart Game" to play again with the same players
7. Use "New Game" to return to the setup screen and change player names

## Game Logic

- **Win Detection**: Checks all 8 possible winning combinations (3 rows, 3 columns, 2 diagonals)
- **Input Validation**: Prevents players from clicking on already occupied squares
- **Turn Management**: Automatically switches between players after each valid move
- **Game State**: Tracks whether the game is active, won, or tied

## Design Principles

- **Encapsulation**: Each module has a single responsibility and hides internal implementation
- **No Global Variables**: All code is contained within modules to prevent namespace pollution
- **Separation of Concerns**: Game logic is separate from display logic
- **Reusability**: The architecture allows for easy extension and modification

## Browser Compatibility

The game works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- Arrow functions and const/let declarations

## License

This project is open source and available under the MIT License.
