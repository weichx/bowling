# Bowling with Babbel

to build:
`npm install`
`webpack`

to test:
`npm install`
`webpack`
`jasmine` (assuming its installed globally already)

to run:
open index.html in chrome (untested on other browsers)

## Assignment
Bowling Challenge
  - Implement a scoring system for a bowling game according to these rules:
  - A game consists of 10 frames.
  - In general each frame has 2 rolls.
  - In general a player scores the number of pins knocked down.
  - If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls.
  - If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.
  - A decent visualisation of the game.

Bonus:

- Add support for the last frame in the game:
- The player gets additional rolls in the last frame: one additional for a spare after the second roll or two extra rolls for a strike.
- Create a method that randomly throws a roll (one roll is 1-10 pins knocked down), and progresses the scoring.
- Support multiple players.

## Architecture
This is built in webgl and uses CannonJS as a physics engine. Outside of Vue, Cannon, and the webpack utilities all code is my own. I included a very primitive resource management system for loading models and textures etc. The UI is built with Vue because it is quite simple and I am not familiar with React yet. The flow of the game is handled by a scene manager where each scene is responsible for its own initialization, cleanup and updating. I think this decouples them quite nicely. There is `TurnManager` that keeps track of who's turn it is and is responsible for recording scores (internally it defers to `ScoreKeeper` but this is hidden in the method interface). The game supports up to 4 players, it could support `n` but 4 seemed reasonable.

## Issues
  I didn't want to go much over the allotted time so naturally this isnt as polished as I would like it to be. Most of the issues I know about stem from the physics engine not working very well. Pins will sometimes stick to the underside of the floor once knocked down which makes the score system sometimes report the wrong score. The scoring itself is well tested, its only during play when determining if a pin has been knocked over that issues occasionally arise. There isn't currently a final game summary, I ran out of time to include this.
  
## Improvements
  I would have liked to have spent more time on the graphics and included PBR shaders with a skybox. I also wanted more camera animation. Physics gave me a lot of trouble on collision detection and on performance. I would select a different engine next time around. I considered adding networked multiplayer through Firebase but decided that in the time allotted I could stick to local multi player. Currently there is no 'gutter' because I couldn't get the torque right on the ball launch and decided to move ahead with a different game play style where the ball shifts back and forth and the player decides when to roll it.
  
## Assets
Models and textures were borrowed from https://dl.dropboxusercontent.com/u/2977490/Unity%40makerhaus/bowling%20game%20example.unitypackage and extracted to JSON with a small Unity C# program I wrote.
