import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData } from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';
import { MaterialModule, MdProgressSpinnerModule } from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AddMobDialogComponent } from './dialog/add-mob.dialog';
@Component({
  templateUrl: './add-mob.component.html',
  styleUrls: ['./add-mob.component.css']
})
export class AddMobComponent {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  public loading = false;
  private mobListService: MobListService;
  public mobData: MobData;
  dialogConfig: MdDialogConfig = {
    disableClose: false,
    role: 'dialog',
    height: '700px',
    width: '800px',
  };
  constructor(
    public dialog: MdDialog,
    private router: Router,
    mobListService: MobListService
  ) {
    this.mobListService = mobListService;
    this.mobData = new MobData();
  }

  showNewMobDialog(mobData: MobData) {
    const dateSelectDialog = this.dialog.open(AddMobDialogComponent, this.dialogConfig);
    if (mobData !== undefined) {
      dateSelectDialog.componentInstance.editMobData(mobData);
    }
  }

  submit() {
    this.loading = true;
    this.mobListService.getRespPerson()
      .subscribe(results => {
        this.loading = false;
        this.mobListService.updateRespPerson(results);
        this.router.navigate(['/review']);
      });
    // this.router.navigate(['/review']);
  }
}
