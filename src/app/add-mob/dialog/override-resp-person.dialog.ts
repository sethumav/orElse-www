import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { MobListService, MobData } from '../../service/mob-list.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { SharedService } from '../../service/shared.service';
import { Environment } from './environment';

@Component({
    selector: 'app-override-resp-person-dialog',
    templateUrl: './override-resp-person.dialog.html',
    styleUrls: ['./override-resp-person.dialog.css']
})
export class OverrideRespPersonDialogComponent {
    mobData: MobData;
    
   
    constructor(
        public dialogRef: MdDialogRef<OverrideRespPersonDialogComponent>       
    ) {
        this.mobData = new MobData();
    }    

    showOverrideRespPersonDialog(mobData: MobData) {
        this.mobData = mobData;
    }

    saveOverrideRespPerson(mobData: MobData){
        this.mobData = mobData;
    }
   
}