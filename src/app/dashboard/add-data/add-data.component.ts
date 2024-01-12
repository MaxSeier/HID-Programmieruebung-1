import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {BackendService} from 'src/app/shared/backend.service';
//import { kindergardens } from 'src/app/shared/data';
import {StoreService} from 'src/app/shared/store.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Child} from "../../shared/interfaces/Child";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public storeService: StoreService, public backendService: BackendService) {
  }

  @ViewChild('form') form!: NgForm;
  @Input() currentPage!: number;

  public kindergardens = this.storeService.kindergardens;
  // ! Must have, ? Optional
  public addChildForm!: FormGroup;


  // Reset form to empty input fields
  private resetForm() {
    this.addChildForm.reset();
    this.form.resetForm();
  }

  ngOnInit(): void {
    this.addChildForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })
  }

  // Save data only when Submit-Button is pressed and form values are correct
  onSubmit() {
    if (this.addChildForm.valid) {
      this.backendService.addChild(this.addChildForm.value, this.currentPage);
      this._snackBar.open(
        'Kind wurde erfolgreich angemeldet', undefined, {duration: 3000}
      );
    }
  }

  // Call rest function after Clear-Button is pressed
  clearAction() {
    this.resetForm();
  }

  /*
  changeDatePicker():any {
    const formValue = this.addChildForm.value;
    this.addChildForm.value.birthDate = formValue(this.addChildForm.value.birthDate).format('DD-MM-YYYY');
  }
   */

}
