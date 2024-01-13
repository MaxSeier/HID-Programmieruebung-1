import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BackendService} from 'src/app/shared/backend.service';
import {StoreService} from 'src/app/shared/store.service';
import {CHILDREN_PER_PAGE} from 'src/app/shared/constants';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Child} from "../../shared/interfaces/Child";
import {interval} from "rxjs";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  // Dependency Injection of backendService -> Zugriff auf removeChild() Methode
  constructor(public storeService: StoreService, public backendService: BackendService) {
  }

  @Input() currentPage!: number;
  @Output() pageChangedEvent = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'kindergarden', 'address', 'age', 'birthDate', 'removeChild'];
  dataSource = new MatTableDataSource<Child>();


  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
    interval(3000).subscribe(() => this.dataSource.data = this.storeService.children)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected readonly CHILDREN_PER_PAGE = CHILDREN_PER_PAGE;
}


