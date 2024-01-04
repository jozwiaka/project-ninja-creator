export class Position {
  constructor(public x: number = -1, public y: number = -1) {}

  isEqualTo(otherPosition: Position): boolean {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }
}
