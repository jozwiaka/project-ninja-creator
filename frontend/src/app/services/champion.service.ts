import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../common/entities/skill';
import { Champion } from '../common/entities/champion';
import { map, Observable } from 'rxjs';
import { ChampionSkill } from '../common/entities/champion-skill';
import { ChampionTree } from '../common/entities/champion-tree';
import { Data } from 'phaser';
import { Attributes } from '../common/entities/attributes';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  private championsUrl = 'http://localhost:8080/api/champions';
  private championTreesUrl = 'http://localhost:8080/api/champion-trees';
  private championSkillsUrl = 'http://localhost:8080/api/champion-skills';
  private attributesUrl = 'http://localhost:8080/api/attributes';

  constructor(private httpClient: HttpClient) {}

  getAttributesByChampionId(championId: number) {
    const url = `${this.attributesUrl}/search/findByChampionId?id=${championId}`;
    return this.httpClient
      .get<Attributes>(url)
      .pipe(map((response) => this.mapToAttributes(response)));
  }

  private mapToAttributes(attributesData: any): Attributes {
    const attributes = new Attributes();
    Object.assign(attributes, attributesData);
    return attributes;
  }

  getChampions() {
    const url = `${this.championsUrl}`;
    return this.httpClient
      .get<GetResponseChampions>(url)
      .pipe(
        map((response) => this.mapToChampions(response._embedded.champions))
      );
  }

  private mapToChampions(championsData: any[]): Champion[] {
    return championsData.map((data) => {
      const champion = new Champion();
      Object.assign(champion, data);
      return champion;
    });
  }

  getChampionSkills() {
    const url = this.championSkillsUrl;
    return this.httpClient
      .get<GetResponseChampionSkills>(url)
      .pipe(map((response) => response._embedded.championSkills));
  }

  getChampionTrees() {
    const url = this.championTreesUrl;
    return this.httpClient
      .get<GetResponseChampionTrees>(url)
      .pipe(map((response) => response._embedded.championTrees));
  }

  deleteChampion(championId: number) {
    const url = `${this.championsUrl}/${championId}`;
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  private async post(url: string, payload: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, payload).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  async alterChampion(champion: Champion) {
    const attributesResponse = await this.postAttributes(champion);
    champion.attributes.id = attributesResponse.id;
    const championResponse = await this.postChampion(champion);
    champion.id = championResponse.id;
    await this.postChampionTrees(champion);
    await this.postChampionSkills(champion);
  }

  private async postChampion(champion: Champion) {
    const url = `${this.championsUrl}`;
    let payload: any;
    let data: any;
    if (champion.id === -1) {
      const { id, grid, ...championData } = champion;
      data = championData;
    } else {
      const { grid, ...championData } = champion;
      data = championData;
    }
    payload = {
      ...data,
      attributes: `${this.attributesUrl}/${champion.attributes.id}`,
    };
    const response = await this.post(url, payload);
    return response as Champion;
  }

  private async postAttributes(champion: Champion) {
    const url = `${this.attributesUrl}`;
    let payload: any;
    if (champion.attributes.id === -1) {
      const { id, ...data } = champion.attributes;
      payload = data;
    } else {
      payload = champion.attributes;
    }
    const response = await this.post(url, payload);
    return response as Attributes;
  }

  private async postChampionTrees(champion: Champion) {
    const url = this.championTreesUrl;

    for (const tree of champion.trees) {
      const payload: ChampionTree = {
        championId: champion.id,
        treeId: tree.id,
        points: tree.points,
      };
      await this.post(url, payload);
    }
  }

  private async postChampionSkills(champion: Champion) {
    const url = this.championSkillsUrl;

    for (const skill of champion.skills) {
      const payload: ChampionSkill = {
        championId: champion.id,
        skillId: skill.id,
        points: skill.points,
      };
      await this.post(url, payload);
    }
  }
}

interface GetResponseChampions {
  _embedded: {
    champions: Champion[];
  };
}

interface GetResponseChampionSkills {
  _embedded: {
    championSkills: ChampionSkill[];
  };
}

interface GetResponseChampionTrees {
  _embedded: {
    championTrees: ChampionTree[];
  };
}
