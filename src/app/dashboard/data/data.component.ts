import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  // Dependendency Injection of backendService -> Zugriff auf removeChild() Methode
  constructor(public storeService: StoreService, public backendService: BackendService) {}
  @Input() currentPage!:number;
  @Output() pageChangedEvent = new EventEmitter();


  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any) {
    this.currentPage = i;
    this.backendService.getChildren(this.currentPage);
    this.pageChangedEvent.emit(this.currentPage);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    this.backendService.getChildren((this.currentPage));
    this.pageChangedEvent.emit(this.currentPage);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }


}


