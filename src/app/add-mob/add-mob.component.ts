import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleDatabase, ExampleDataSource} from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';

@Component({
  templateUrl: './add-mob.component.html',
  styleUrls: ['./add-mob.component.css']
})
export class AddMobComponent implements OnInit {
  displayedColumns = ['task', 'application', 'startTime', 'endTime', 'resourceGroup', 'anything', 'anything1', 'anything2'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
  }
}
