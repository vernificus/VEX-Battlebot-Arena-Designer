# Battlebot Field Planner

An interactive website for teachers to plan out a battlebot field using VEX IQ field pieces. This tool helps visualize the placement of required balloon challenges on a standard 6' x 8' grid.

## Features

- **Interactive 6x8 Grid**: Represents the standard VEX IQ field dimensions.
- **Drag-and-Drop Interface**: Easily place elements onto the field.
- **Challenge Palette**: Includes all required balloon challenges:
  - Cave / Covered Structure
  - 12in off the ground
  - Tight Corner
  - Dead-end
  - Jail Cell / Behind Bars
  - Suspended 3in off the ground
  - Moving Element
  - Stacked (2 balloons)
  - Zig-zag
  - 6in off the ground
- **Field Elements**: Walls and Obstacles to design the layout.
- **Clear Field**: Reset the board to start over.

## How to Use

1. **Open the Planner**: Open `index.html` in your web browser.
2. **Select an Element**: Click and drag an item from the "Elements" sidebar.
3. **Place on Grid**: Drop the item onto any square on the grid.
4. **Remove Item**: Click on a placed item on the grid to remove it.
5. **Clear All**: Use the "Clear Field" button to remove all items.

## Deployment to GitHub Pages

This project is configured to be deployed via GitHub Actions.

1. Go to the repository **Settings**.
2. Navigate to **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The site will automatically deploy whenever you push to the `main` branch.
