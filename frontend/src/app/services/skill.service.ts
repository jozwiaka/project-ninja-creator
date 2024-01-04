import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../common/entities/skill';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private baseUrl = 'http://localhost:8080/api/skills';

  constructor(private httpClient: HttpClient) {}

  getSkills() {
    const url = `${this.baseUrl}?size=100`;
    return this.httpClient
      .get<GetResponseSkills>(url)
      .pipe(map((response) => this.mapToSkills(response._embedded.skills)));
  }

  getSkillsByTreeId(treeId: number) {
    const url = `${this.baseUrl}/search/findByTreeId?id=${treeId}`;
    return this.httpClient
      .get<GetResponseSkills>(url)
      .pipe(map((response) => this.mapToSkills(response._embedded.skills)));
  }

  private mapToSkills(skillsData: any[]): Skill[] {
    return skillsData.map((data) => {
      const skill = new Skill();
      Object.assign(skill, data);
      skill.update();
      return skill;
    });
  }
  private mapToSkill(skillData: any): Skill {
    const skill = new Skill();
    Object.assign(skill, skillData);
    skill.update();
    return skill;
  }
}

interface GetResponseSkills {
  _embedded: {
    skills: Skill[];
  };
}
