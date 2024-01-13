import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  // empty array children shall be filled with values from data file -> backend.service
  public children: ChildResponse[] = []

  public kindergardens: Kindergarden[] = []

  public childrenTotalCount = 0;
  public isLoading = true;
  public isChildrenLoading = false;
}
