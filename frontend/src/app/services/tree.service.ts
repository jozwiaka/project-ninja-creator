import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tree } from '../common/entities/tree';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  private baseUrl = 'http://localhost:8080/api/trees';

  constructor(private httpClient: HttpClient) {}

  getTrees() {
    const url = this.baseUrl;
    return this.httpClient
      .get<GetResponseTrees>(url)
      .pipe(map((response) => this.mapToTrees(response._embedded.trees)));
  }

  private mapToTrees(treesData: any[]): Tree[] {
    return treesData.map((data) => {
      const tree = new Tree();
      Object.assign(tree, data);
      return tree;
    });
  }
}

interface GetResponseTrees {
  _embedded: {
    trees: Tree[];
  };
}
