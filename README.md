# like-rogue v0.3
I thought it would be cool to make a roguelike that solely used text as the interface. Little did I know, this is exactly what the legendary original Rogue and its subsequent classics did throughout the 80s. Nevertheless, I think it'll be fun to make.

## Components
The game's UI currently includes:
  - 9x32 map
  - Live player coordinates
  - Inventory list
  - Interactions console

## Controls and Mechanics
The game is played using:
  - The arrow keys to move around
  - Walls that cannot be moved through
  - Keys that can be picked up
  - Doors that can be unlocked with a key

### Keys
Keys are represented by a 'k'.
When the player interacts with one, a single key is added to their inventory. If they already have a key, the keys in their inventory remains one.

### Doors
Doors are represented by a '('.
When the player interacts with one, they are told it is locked.
If the player interacts with the door and has a key, they open the door. Opening the door removes it from the map, replacing it with a white space. The player's number of keys remains the same.

#### Future Intentions
Doors are intended to also be represented by a ')', if they are locked from the other side. This may be added in a future update, and leave possibility for level design of being able to open a door from one side but not the other.

### Combat
Enemies are represented by an 'E'.

#### Future Intentions
NPCs are intended to all be represented by capital letters. Colours will distinguish between the player's relationship with the NPC, for example, red for enemy and green for friendly.

## Running the Game
The game can be accessed on the website in the description, at: https://roguelike.w3spaces.com
