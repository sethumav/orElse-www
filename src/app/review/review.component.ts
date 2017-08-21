import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MobListService, MobData } from '../service/mob-list.service';
import { DataSource } from '@angular/cdk';
import { EmailService } from '../service/email.service';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements AfterViewChecked {
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    private sendingEmails = false;
    private tableUpdated = false;
    private mobListService: MobListService;
    private emailService: EmailService;
    private dataSource: DataSource<MobData>;
    displayedColumns = ['section', 'task', 'application', 'respPerson'];

    constructor(mobListService: MobListService, emailService: EmailService) {
        this.mobListService = mobListService;
        this.dataSource = this.mobListService.mbDataSource;
        this.emailService =emailService;
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
        this.sendingEmails = true;
        let mobData: MobData;
        for( let i in this.mobListService.data){ 
            mobData = this.mobListService.data[i];
            this.emailService.sendEmails( mobData.application, JSON.stringify(mobData), mobData.respPersons);
        }
    }
}
