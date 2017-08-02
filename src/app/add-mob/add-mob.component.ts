import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData} from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';

@Component({
  templateUrl: './add-mob.component.html',
  styleUrls: ['./add-mob.component.css']
})
export class AddMobComponent{
  private mobListService: MobListService;
  private mobData: MobData;
  private dataSource: DataSource<MobData>;
  displayedColumns = ['task', 'application', 'startTime', 'endTime', 'resourceGroup', 'anything', 'anything1', 'anything2'];

  constructor(mobListService: MobListService){
    this.mobListService = mobListService;
    this.dataSource = mobListService.mbDataSource;
    this.mobData = new MobData();
  }

  addRow(){
    this.mobListService.addMobData(this.mobData);
    // clear form after added
    this.mobData = new MobData();
  }
}
