import { Attributes } from '../entities/attributes';
import { Skill } from '../entities/skill';
import { Tree } from '../entities/tree';

export class ChampionBackup {
  constructor(
    public skillPoints: number = 0,
    public attributePoints: number = 0,
    public attributes: Attributes = new Attributes(),
    public trees: Tree[] = [],
    public skills: Skill[] = []
  ) {}
}
