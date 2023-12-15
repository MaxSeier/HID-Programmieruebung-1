import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public isFormHidden = false;
  
  // current Page variable in parent class --> cross component communication
  public currentPage = 1;

  pageChanged(page: number) {
    this.currentPage = page;
  }
}
