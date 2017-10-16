import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrListService, CrData } from '../service/cr-list.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';
import { MaterialModule, MdProgressSpinnerModule } from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AddCrDialogComponent } from './dialog/add-cr.dialog';
@Component({
  templateUrl: './add-cr.component.html',
  styleUrls: ['./add-cr.component.css']
})
export class AddCrComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  public loading = false;
  crListService: CrListService;
  public crData: CrData;
  dialogConfig: MdDialogConfig = {
    disableClose: false,
    role: 'dialog',
    height: '400px',
    width: '500px',
  };
  constructor(
    public dialog: MdDialog,
    private router: Router,
    crListService: CrListService
  ) {
    this.crListService = crListService;
    this.crData = new CrData();
  }

  showNewCrDialog(mobData?: CrData) {
    const crDialog = this.dialog.open(AddCrDialogComponent, this.dialogConfig);   
  }

  addMob(){
    this.router.navigate(['/addmob']);
  }

}