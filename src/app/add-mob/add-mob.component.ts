import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData} from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';
import {MaterialModule, MdProgressSpinnerModule} from '@angular/material';
@Component({
  templateUrl: './add-mob.component.html',
  styleUrls: ['./add-mob.component.css']
})
export class AddMobComponent{

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  public loading = false;
  private mobListService: MobListService;
  public mobData: MobData;

  public dataSource: DataSource<MobData>;
  displayedColumns = ['section', 'task', 'environment', 'application',
  'startTime', 'endTime', 'preValidation', 'postValidation', 'resourceGroup', 'anything', 'anything1', 'anything2'];

  constructor(
    private router: Router,
    mobListService: MobListService
  ) {
    this.mobListService = mobListService;
    this.dataSource = mobListService.mbDataSource;
    this.mobData = new MobData();
  }

  addRow() {
    this.mobListService.addMobData(this.mobData);
    // clear form after added
    this.mobData = new MobData();
  }

  submit() {
    this.loading = true;
    this.mobListService.getRespPerson()
        .subscribe(results => {
          this.loading = false;
          this.mobListService.updateRespPerson(results);
          this.router.navigate(['/review']);
        });
  }
}
