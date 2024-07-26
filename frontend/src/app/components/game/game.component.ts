// game.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/common/entities/skill';
import { Size } from 'src/app/common/geometry/size';
import { Utils } from 'src/app/common/tools/utils';
import { Grid } from '../../common/board/grid';
import { Tile } from '../../common/board/tile';
import { Champion } from 'src/app/common/entities/champion';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/common/control/status';
import { AffirmationComponent } from './dialogs/affirmation/affirmation.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  Utils = Utils;
  grid: Grid = new Grid({ width: 12, height: 12 });
  gridBackup?: Grid;

  skillsListSize: Size = { width: 3, height: 5 };
  passivesListSize: Size = { width: 3, height: 3 };

  players: Champion[] = [];
  activePlayerIndex = 0;
  activePlayer!: Champion;

  chosenEnemy?: Champion;

  chosenChampion!: Champion;
  selectedChampion?: Champion;

  selectedTile?: Tile;
  selectedSkill?: Skill;

  terminate: boolean = false;
  terminateTurns = -1;

  initialized = false;

  dmg = 0;

  @ViewChild('skillHistory') skillHistory!: ElementRef;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.players = this.sharedDataService.championsInGame;
    if (!this.players.length) {
      router.navigateByUrl('menu');
    } else {
      this.players.forEach((champion) => champion.init());
      this.players = Utils.shuffleArray(this.players);
      this.activePlayer = this.players[this.activePlayerIndex];
      this.activePlayer.atTheBeginningOfTheTurn();
      this.grid.setDefaultStartingPlayerPositions(this.players);
      // this.grid.initObstacles();
      this.chosenChampion = this.activePlayer;
      this.initialized = true;
    }
  }

  return() {
    this.router.navigateByUrl('game-creator');
  }

  setTargetableStatusForTiles() {
    if (this.selectedSkill) {
      this.grid.setTargetableStatusForTiles(
        this.chosenChampion,
        this.selectedSkill
      );
      switch (this.selectedSkill.target) {
        case 'self':
          let tile = this.grid.getTileByChampion(this.chosenChampion);
          if (tile) {
            tile.status.targetable = true;
          }
          break;
        case 'tile':
          this.players.forEach((player) => {
            let tile = this.grid.getTileByChampion(player);
            if (tile) {
              tile.status.targetable = false;
            }

            player.mirrors.forEach((mirror) => {
              let tile = this.grid.getTileByChampion(mirror);
              if (tile) {
                tile.status.targetable = false;
              }
            });
            player.clones.forEach((clone) => {
              let tile = this.grid.getTileByChampion(clone);
              if (tile) {
                tile.status.targetable = false;
              }
            });
          });
          break;
        case 'enemy':
          this.players.forEach((player) => {
            let tile = this.grid.getTileByChampion(player);
            if (tile) {
              if (tile.champion === this.activePlayer) {
                tile.status.targetable = false;
              }
            }

            player.clones.forEach((clone) => {
              let tile = this.grid.getTileByChampion(clone);
              if (tile) {
                if (tile.champion?.owner === this.activePlayer) {
                  tile.status.targetable = false;
                }
              }
            });
          });
      }
    }
  }

  handleChampionSkill(skill: Skill) {
    if (this?.players) {
      this.chosenChampion.skills.forEach((a) => {
        a.status.clicked = false;
      });
      skill.status.clicked = true;
      this.selectedSkill = skill;
      this.chosenChampion.resetSkill(this.selectedSkill);
      if (this.selectedSkill.target !== 'none') {
        this.setTargetableStatusForTiles();
      } else {
        this.grid.unsetTargetableStatuses();
      }
    }
  }

  checkIfCanUseSkill() {
    if (
      this.selectedSkill &&
      this.selectedSkill.target !== 'none' &&
      this.selectedSkill.cooldownTimer === 0 &&
      this.chosenChampion.skillHistory.length +
        this.selectedSkill.castTime +
        1 <=
        this.chosenChampion.attackSpeed &&
      this.chosenChampion.canPayForSkill(this.selectedSkill)
    ) {
      if (
        this.selectedSkill.requiresKyuubiChakra &&
        !this.chosenChampion.kyuubiChakra
      ) {
        return false;
      }
      if (this.selectedSkill.mirror) {
        if (this.grid.checkIfMirrorsExist()) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  checkIfTargetIsValid() {
    switch (this.selectedSkill?.target) {
      case 'self':
        return true;

      case 'tile':
        if (this.selectedTile && this.selectedTile.status.targetable) {
          if (!this.selectedTile.champion) {
            return true;
          }
        }
        break;
      case 'enemy':
        if (this.selectedSkill.requiresTargetInAir) {
          if (!this.selectedTile?.champion?.inAir) {
            return false;
          }
        }
        if (this.selectedSkill.mirror) {
          if (this.selectedTile?.champion?.status.mirror) {
            return false;
          }
        }
        if (
          this.selectedTile &&
          this.selectedTile.status.targetable &&
          this.selectedTile.champion &&
          !this.selectedTile.champion.status.invisible &&
          this.selectedTile.champion !== this.chosenChampion &&
          this.selectedTile.champion.health > 0
        ) {
          return true;
        }
    }
    return false;
  }

  getPassiveFromList(
    champion: Champion,
    row: number,
    col: number
  ): Skill | undefined {
    if (this?.players) {
      const i = (row - 1) * this.passivesListSize.width + col - 1;
      if (i < champion.skillsPassives.length) {
        return champion.skillsPassives[i];
      }
    }
    return undefined;
  }

  getSkillFromList(
    champion: Champion,
    row: number,
    col: number
  ): Skill | undefined {
    if (this?.players) {
      const i = (row - 1) * this.skillsListSize.width + col - 1;
      if (i < champion.skillsUsable.length) {
        return champion.skillsUsable[i];
      }
    }
    return undefined;
  }

  end() {
    let showAffirmationDialog = false;

    if (this.activePlayer.skillHistory.length < this.activePlayer.attackSpeed) {
      showAffirmationDialog = true;
    }

    if (!showAffirmationDialog) {
      for (const clone of this.activePlayer.clones) {
        if (clone.skillHistory.length < clone.attackSpeed) {
          showAffirmationDialog = true;
          break;
        }
      }
    }

    if (showAffirmationDialog) {
      const dialogRef = this.dialog.open(AffirmationComponent, {
        width: '400px',
        data: {},
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.endOfTheTurn();
        }
      });
    } else {
      this.endOfTheTurn();
    }
  }

  endOfTheTurn() {
    this.dmg = 0;
    this.selectedSkill = undefined;
    this.selectedChampion = undefined;
    this.chosenEnemy = undefined;
    this.grid.resetAllTilesStatuses();
    this.players.forEach((player) => {
      player.dmgOnSelf = 0;
      player.dmgOnSelfArmor = 0;
      player.clones.forEach((clone) => {
        clone.dmgOnSelf = 0;
        clone.dmgOnSelfArmor = 0;
      });
    });

    if (this.terminate && this.terminateTurns === -1) {
      this.terminateTurns = this.players.length - (this.activePlayerIndex + 1);
    }
    if (this.terminateTurns === 0) {
      this.terminate = false;
      // this.players.forEach(player=>{
      //   player.clones.forEach(clone=>clones=[])
      // })
      this.players.forEach((player) => {
        if (!player.health) {
          this.grid.unassignChampionFromGrid(player);
        }
        player.clones.forEach((clone) => {
          this.grid.unassignChampionFromGrid(clone);
        });
        player.clones = [];
      });
      this.players = this.players.filter((player) => player.health !== 0);
      if (this.players.length === 1) {
        this.router.navigateByUrl('game-results');
      }
    }

    if (this.terminate) {
      this.terminateTurns--;
    }

    this.activePlayerIndex++;
    if (this.activePlayerIndex + 1 > this.players.length) {
      this.activePlayerIndex = 0;
    }

    this.activePlayer?.atTheEndOfTheTurn();
    this.activePlayer = this.players[this.activePlayerIndex];
    this.activePlayer.atTheBeginningOfTheTurn();

    this.chosenChampion = this.activePlayer;
  }

  unselectSkill() {
    if (this.selectedSkill) {
      this.chosenChampion.resetSkill(this.selectedSkill);
    }
    this.selectedSkill = undefined;
    this.grid.unsetTargetableStatuses();
  }

  selectTile(tile: Tile) {
    this.selectedTile = tile;
    this.grid.selectTile(tile);

    this.selectedChampion = this.selectedTile.champion;

    if (
      this.selectedChampion !== this.activePlayer &&
      this.selectedChampion?.owner !== this.activePlayer &&
      !this.selectedChampion?.status.invisible
    ) {
      this.chosenEnemy = this.selectedChampion;
    } else {
      this.chosenEnemy = undefined;
    }

    if (
      this.selectedChampion &&
      this.selectedChampion.status.preview === false &&
      (this.selectedChampion === this.activePlayer ||
        this.selectedChampion?.owner === this.activePlayer)
    ) {
      if (this.selectedChampion !== this.chosenChampion) {
        this.unselectSkill();
        this.chosenChampion = this.selectedChampion;
      }
    }
  }

  useSkill() {
    if (this.selectedSkill) {
      if (this.selectedSkill.usages <= 0) {
        this.chosenChampion.paySkillCost(this.selectedSkill);
        for (let i = 0; i < this.selectedSkill.castTime; i++) {
          let skillCopy = new Skill();
          Object.assign(skillCopy, this.selectedSkill);
          skillCopy.status = new Status();
          skillCopy.status.loading = true;
          this.chosenChampion.skillHistory.push(skillCopy);
        }
        this.chosenChampion.skillHistory.push(this.selectedSkill);

        this.selectedSkill.startCooldownTimer();
      }

      switch (this.selectedSkill.target) {
        case 'self':
          this.chosenChampion.useSkillOnSelf(this.selectedSkill);
          break;

        case 'tile':
          if (this.selectedTile) {
            this.chosenChampion.useSkillOnTile(
              this.selectedSkill,
              this.selectedTile
            );
          }
          break;

        case 'enemy':
          if (this.selectedTile) {
            if (this.selectedSkill.mirror) {
              this.gridBackup = this.grid.deepCopy();
            }
            this.chosenChampion.useSkillOnEnemy(
              this.selectedSkill,
              this.selectedTile.champion as Champion
            );
            if (this.selectedSkill.mirror) {
              this.grid = this.chosenChampion.grid;
            }
          }
          break;
      }

      this.players.forEach((champion) => {
        let clonesAlive: Champion[] = [];

        champion.clones.forEach((clone) => {
          if (clone.health > 0) {
            clonesAlive.push(clone);
          } else {
            this.grid.unassignChampionFromGrid(clone);
            this.chosenEnemy = undefined;
          }
        });
        champion.clones = clonesAlive;

        let mirrorsHealth = Math.min(
          ...champion.mirrors.map((mirror) => mirror.health)
        );

        champion.mirrors.forEach((mirror) => {
          mirror.health = mirrorsHealth;
          if (mirror.health <= 0) {
            champion.mirrors = [];
            this.chosenEnemy = undefined;
            if (this.gridBackup) {
              this.grid = this.gridBackup;
              this.players.forEach((player) => {
                player.grid = this.grid;
              });
            }
          }
        });

        this.setTargetableStatusForTiles();

        if (champion.health <= 0) {
          this.terminate = true;
        }
      });
    }
  }
}
