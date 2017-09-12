import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { MobListService, MobData } from '../../service/mob-list.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
@Component({
    selector: 'app-add-mob-dialog',
    templateUrl: './add-mob.dialog.html',
    styleUrls: ['./add-mob.dialog.css']
})
export class AddMobDialogComponent {
    mobData: MobData;
    isEdit = false;

    constructor(
        public dialogRef: MdDialogRef<AddMobDialogComponent>,
        private mobListService: MobListService
    ) {
        this.mobData = new MobData();
    }

    addRow() {
        this.mobListService.addMobData(this.mobData);
        // clear form after added
        this.mobData = new MobData();
    }
    editMobData(mobData: MobData){
        this.mobData = mobData;
        this.isEdit = true;
    }
}
