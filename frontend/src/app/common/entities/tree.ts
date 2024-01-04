import { Skill } from './skill';

export class Tree {
  skills: Skill[] = [];
  points: number = 0;
  tier1: number = 1;
  tier2: number = 2;
  tier3: number = 3;
  constructor(public id: number = -1, public name: string = '') {}
}
