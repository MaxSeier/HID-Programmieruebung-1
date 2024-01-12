import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getChildren(page: number) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'))
      this.loadingData();
    });
  }

  /* this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}`, { observe: 'response' }).subscribe(data => {
    this.storeService.children = data.body!;
    this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));

  });
  */

  public getKindergarden() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
      this.loadingData();
    });
  }

  public addChild(child: Child, page: number) {
    this.http.post<Child>('http://localhost:5000/childs', child).subscribe(data => {
      this.getChildren(page);
      this.loadingData();
    });
  }

  // template String with backticks `` so that ${} works
  public removeChild(childId: string, page: number) {
    this.http.delete<void>(`http://localhost:5000/childs/${childId}`).subscribe(date => {
      this.getChildren(page);
      this.loadingData();
    })
  }

  private loadingData() {
    this.storeService.isLoading = false;
    this.storeService.isChildrenLoading = true;
  }

}
