import { Obstacle } from './obstacle';
import { Status } from '../control/status';
import { Champion } from '../entities/champion';
import { Skill } from '../entities/skill';
import { Position } from '../geometry/position';

export class Tile {
  champion: Champion | undefined;

  constructor(
    public position: Position = new Position(),
    public status: Status = new Status(),
    public obstacle: Obstacle = new Obstacle()
  ) {}
}
