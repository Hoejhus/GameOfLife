# Game of Life

A lightweight, dependency-free web version of Conway’s Game of Life.  
Built as a 3rd-semester project in an AP Computer Science degree.


## Overview
Conway’s Game of Life is a cellular automaton 2d grid game. Each cell is either **alive** or **dead**, and the whole board updates in ticks based on simple neighbor rules.

This project focuses on:
- A clean, dependency-free web implementation (HTML/CSS/JavaScript).
- Simple, obvious controls for starting, stopping, stepping, randomizing, and clearing the board.
- Click-to-toggle editing so you can draw your own patterns before running the simulation.


## Features
- Interactive grid — click to toggle cells.
- Controls: **Start/Pause**, **Step**, **Random**, **Clear**.
- Pure **HTML/CSS/JavaScript** (no frameworks).

## Quick Start
    git clone https://github.com/Hoejhus/GameOfLife.git
    cd GameOfLife
    # Open index.html in your browser

(Optional local server):

    # Python 3
    python -m http.server 8000
    # visit http://localhost:8000

## How it works
Each tick applies the classic Life rules using the 8 neighbors (Moore neighborhood):
- Live cell survives with 2–3 neighbors.
- Dead cell is born with exactly 3 neighbors.
- Otherwise, the cell is dead next tick.

## Project Structure
    GameOfLife/
    ├─ index.html   # layout + controls
    ├─ style.css    # styling
    └─ script.js    # logic
