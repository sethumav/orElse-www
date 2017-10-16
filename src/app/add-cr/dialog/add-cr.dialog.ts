import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { CrListService, CrData } from '../../service/cr-list.service';
import { MdDialog, MdDialogConfig } from '@angular/material';

@Component({
    selector: 'app-add-cr-dialog',
    templateUrl: './add-cr.dialog.html',
    styleUrls: ['./add-cr.dialog.css']
})
export class AddCrDialogComponent {
    crData: CrData;
    isEdit = false;
  
   
    constructor(
        public dialogRef: MdDialogRef<AddCrDialogComponent>,
        private crListService: CrListService
    ) {
        this.crData = new CrData();
    }

    addRow() {              
        this.crListService.addCrData(this.crData);    
    }

}