import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BackendService} from 'src/app/shared/backend.service';
//import { kindergardens } from 'src/app/shared/data';
import {StoreService} from 'src/app/shared/store.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) { //private _snackBar:MatSnackBar) {
  }

  public kindergardens = this.storeService.kindergardens;
  // ! Must have, ? Optional
  public addChildForm!: FormGroup;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.backendService.addChild(this.addChildForm.value, this.currentPage);
      /*
      For some reason I cannot implement this snack bar for the notifications. As soon as I import and use it, the whole form will disappear
      this._snackBar.open(
        'Kind wurde erfolgreich angemeldet'
      );
       */
    }
  }
}
