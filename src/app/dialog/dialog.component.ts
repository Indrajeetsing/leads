import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { SalesLeadsService } from '../sales-leads/sales-leads.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salesLeadsService: SalesLeadsService
  ) { }

  leadForm = this.formBuilder.group({
    lead: ['', Validators.required],
    rep: ['', Validators.required],
    client: ['', Validators.required],
    value: [null, Validators.required],
    date: [null, Validators.required]
  });

  save() {
    console.log(this.leadForm);
    if (this.leadForm.valid) {
      this.salesLeadsService.postLead(this.leadForm.value).subscribe(
        (response: any) => {
          this.dialogRef.close('successfully added');
        }, (error: any) => {
          console.log(error);
        }
      )
    }
  }

}