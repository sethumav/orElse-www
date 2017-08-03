import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData } from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';

@Component({
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements AfterViewChecked {
    private tableUpdated = false;
    private mobListService: MobListService;
    private dataSource: DataSource<MobData>;
    displayedColumns = ['section', 'task', 'application', 'respPerson'];

    constructor(mobListService: MobListService) {
        this.mobListService = mobListService;
        this.dataSource = this.mobListService.mbDataSource;
        console.log(this.dataSource);
    }
    ngAfterViewChecked() {
        // datatable won't load if the data are not change so we wait half seconds to call an update 
        // will find a better way later
        setTimeout(this.update, 100);
    }
    update() {
        if (this.tableUpdated === false) {
            this.tableUpdated = true;
            this.mobListService.upate();
        }
    }
    sendEmails() {
        
    }
}
