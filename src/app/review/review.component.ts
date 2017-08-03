import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData } from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';

@Component({
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    private mobListService: MobListService;
    private dataSource: DataSource<MobData>;
    displayedColumns = ['section', 'task', 'application', 'respPerson'];

    constructor(mobListService: MobListService) {
        this.mobListService = mobListService;
        console.log(this.dataSource);
    }
    ngOnInit() {
        this.dataSource = this.mobListService.mbDataSource;
    }
    update() {
        this.mobListService.upate();
    }
}
