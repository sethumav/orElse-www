import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrListService, CrData } from '../service/cr-list.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';
import { MaterialModule, MdProgressSpinnerModule } from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AddCrDialogComponent } from './dialog/add-cr.dialog';
import { ChangeRequest } from './../service/cr-list.service'
import { SharedService } from './../service/shared.service';


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
  sharedService: SharedService;
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
    crListService: CrListService,
    sharedService: SharedService    
  ) {
    this.crListService = crListService;
    this.sharedService = sharedService;
    this.crData = new CrData(new ChangeRequest(null, null), null);
  }

  showNewCrDialog(mobData?: CrData) {
    const crDialog = this.dialog.open(AddCrDialogComponent, this.dialogConfig);   
  }

  gotoMobList(crData: CrData){
      this.sharedService.updateGlobalCrData(crData);
      this.router.navigate(['/addmob']);
  }  

  ngOnInit(){
    this.loading = false;
    this.crListService.getAllChangeRequests()
    .subscribe(results => {
      this.loading = false;
      this.crListService.updateChangeRequestList(results);      
    });
  }

}