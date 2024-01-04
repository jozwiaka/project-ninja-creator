import { Skill } from './../entities/skill';
import { Status } from '../control/status';
import { Champion } from '../entities/champion';
import { Position } from '../geometry/position';
import { Size } from '../geometry/size';
import { Tile } from './tile';

export class Grid {
  tiles: Tile[][] = [];

  constructor(public size: Size) {
    for (let x = 0; x < this.size.width; x++) {
      const row: Tile[] = [];
      for (let y = 0; y < this.size.height; y++) {
        let tile = new Tile(new Position(x, y));
        row.push(tile);
      }
      this.tiles.push(row);
    }
  }

  initObstacles() {
    for (let y = 0; y < this.size.height; y++) {
      this.tiles[0][y].obstacle.water = true;
    }
    for (let y = 0; y < this.size.height; y++) {
      // this.tiles[2][y].obstacle.rock = true;
    }
  }

  deepCopy() {
    let copiedGrid = new Grid(new Size(this.size.width, this.size.height));
    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        const originalTile = this.tiles[x][y];
        let copiedTile = new Tile();
        copiedTile = Object.assign({}, originalTile);
        copiedGrid.tiles[x][y] = copiedTile;
      }
    }
    return copiedGrid;
  }

  setDefaultStartingPlayerPositions(champions: Champion[]) {
    const positions: Position[] = [
      new Position(1, this.size.height - 2),
      new Position(this.size.width - 2, 1),
      new Position(this.size.width - 2, this.size.height - 2),
      new Position(1, 1),
    ];

    for (let i = 0; i < champions.length; i++) {
      this.assignChampionToGrid(champions[i], positions[i]);
      champions[i].grid = this;
    }
  }

  getChampionPosition(champion: Champion) {
    const tile = this.getTileByChampion(champion);
    if (tile) {
      return tile.position;
    }
    return undefined;
  }

  getTileByPosition(position: Position): Tile {
    return this.tiles[position.x][position.y];
  }

  getTileByChampion(champion: Champion): Tile | undefined {
    let tile: Tile | undefined;
    this.tiles.forEach((row) => {
      const foundTile = row.find((t) => t.champion === champion);
      if (foundTile) {
        tile = foundTile;
      }
    });
    return tile;
  }

  getSelectedTile(): Tile | undefined {
    let selectedTile: Tile | undefined;
    this.tiles.forEach((row) => {
      const foundTile = row.find((t) => t.status.selected === true);
      if (foundTile) {
        selectedTile = foundTile;
      }
    });
    return selectedTile;
  }

  unassignChampionFromGrid(champion: Champion) {
    let tile = this.getTileByChampion(champion);
    if (tile) {
      tile.champion = undefined;
    }
  }

  assignChampionToGrid(champion: Champion, position: Position) {
    let tile = this.getTileByChampion(champion);
    if (tile) {
      tile.champion = undefined;
    }

    tile = this.getTileByPosition(position);
    tile.champion = champion;
  }

  resetAllTilesStatuses() {
    this.tiles.forEach((row) => {
      row.forEach((t) => t.status.reset());
    });
  }

  unsetTargetableStatuses() {
    this.tiles.forEach((row) => {
      row.forEach((t) => {
        t.status.targetable = false;
        t.status.preview = false;
      });
    });
  }

  setTargetableStatusForTiles(champion: Champion, skill: Skill) {
    const range = champion.getSkillRange(skill);
    this.unsetTargetableStatuses();
    const position = this.getChampionPosition(champion);
    if (position) {
      let x = position.x;
      let y = position.y;

      for (let x = position.x + 1; x <= position.x + range; x++) {
        if (
          x >= 0 &&
          y >= 0 &&
          x <= this.size.width - 1 &&
          y <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(new Position(x, y), champion, skill)
          ) {
            break;
          }
        }
      }
      for (let x = position.x - 1; x >= position.x - range; x--) {
        if (
          x >= 0 &&
          y >= 0 &&
          x <= this.size.width - 1 &&
          y <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(new Position(x, y), champion, skill)
          ) {
            break;
          }
        }
      }

      for (let y = position.y + 1; y <= position.y + range; y++) {
        if (
          x >= 0 &&
          y >= 0 &&
          x <= this.size.width - 1 &&
          y <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(new Position(x, y), champion, skill)
          ) {
            break;
          }
        }
      }
      for (let y = position.y - 1; y >= position.y - range; y--) {
        if (
          x >= 0 &&
          y >= 0 &&
          x <= this.size.width - 1 &&
          y <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(new Position(x, y), champion, skill)
          ) {
            break;
          }
        }
      }

      for (let i = 1; i <= range; i++) {
        if (
          x + i >= 0 &&
          y + i >= 0 &&
          x + i <= this.size.width - 1 &&
          y + i <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(
              new Position(x + i, y + i),
              champion,
              skill
            )
          ) {
            break;
          }
        }
      }
      for (let i = 1; i <= range; i++) {
        if (
          x - i >= 0 &&
          y - i >= 0 &&
          x - i <= this.size.width - 1 &&
          y - i <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(
              new Position(x - i, y - i),
              champion,
              skill
            )
          ) {
            break;
          }
        }
      }

      for (let i = 1; i <= range; i++) {
        if (
          x + i >= 0 &&
          y - i >= 0 &&
          x + i <= this.size.width - 1 &&
          y - i <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(
              new Position(x + i, y - i),
              champion,
              skill
            )
          ) {
            break;
          }
        }
      }
      for (let i = 1; i <= range; i++) {
        if (
          x - i >= 0 &&
          y + i >= 0 &&
          x - i <= this.size.width - 1 &&
          y + i <= this.size.height - 1
        ) {
          if (
            this.resolveTargetableStatus(
              new Position(x - i, y + i),
              champion,
              skill
            )
          ) {
            break;
          }
        }
      }
    }
  }

  private resolveTargetableStatus(
    position: Position,
    champion: Champion,
    skill: Skill
  ) {
    let tile = this.getTileByPosition(position);
    if (tile.obstacle.water && skill.target !== 'enemy') {
      return true;
    }
    if (tile.obstacle.rock) {
      return true;
    }
    tile.status.targetable = true;
    if (tile.champion?.status.mirror && tile.champion?.owner === champion) {
      return false;
    }
    if (tile.champion && !tile.champion?.status.preview) {
      return true;
    }
    return false;
  }

  unselectSelectedTile(): void {
    this.tiles.forEach((row) => {
      row.forEach((t) => (t.status.selected = false));
    });
  }

  selectTile(tile: Tile): void {
    this.tiles.forEach((row) => {
      row.forEach((t) => (t.status.selected = false));
    });

    tile.status.selected = true;
  }

  findFirstTargetableTileWithChampionOtherThan(champion: Champion) {
    let tile: Tile | undefined;
    this.tiles.forEach((row) => {
      const foundTile = row.find(
        (t) => t.status.targetable && t.champion && t.champion != champion
      );
      if (foundTile) {
        tile = foundTile;
      }
    });
    return tile;
  }
  swapChampionPositions(champion1: Champion, champion2: Champion) {
    let positionTmp = new Position();
    let champion1Position = this.getChampionPosition(champion1);
    let champion2Position = this.getChampionPosition(champion2);
    if (champion1Position && champion2Position) {
      Object.assign(positionTmp, champion2Position);
      champion2Position = champion1Position;
      champion1Position = positionTmp;
      this.assignChampionToGrid(champion1, champion1Position);
      this.assignChampionToGrid(champion2, champion2Position);
    }
  }
  checkIfMirrorsExist(): boolean {
    let tile: Tile | undefined;
    this.tiles.forEach((row) => {
      const foundTile = row.find((t) => t.champion?.status.mirror);
      if (foundTile) {
        tile = foundTile;
      }
    });
    if (tile) {
      return true;
    }
    return false;
  }
}
