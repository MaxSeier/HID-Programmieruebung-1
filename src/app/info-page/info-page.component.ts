import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {BackendService} from "../shared/backend.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Kindergarden, Typ} from "../shared/interfaces/Kindergarden";
import {MatTableDataSource} from "@angular/material/table";
import {interval} from "rxjs";

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, AfterViewInit {
  constructor(public storeService: StoreService, public backendService: BackendService) {
  }

  public title: string = 'Kindergärten';
  protected displayedColumns: string[] = ['name', 'address', 'betreiber', 'typ', 'bild'];
  protected dataSource = new MatTableDataSource<Kindergarden>();
  protected readonly KindergardenType = Typ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.backendService.getKindergarden();
    interval(3000).subscribe(() => this.dataSource.data = this.storeService.kindergardens)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
