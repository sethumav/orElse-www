import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { CrListService, CrData, ChangeRequest } from '../../service/cr-list.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-add-cr-dialog',
    templateUrl: './add-cr.dialog.html',
    styleUrls: ['./add-cr.dialog.css']
})
export class AddCrDialogComponent {
    crData: CrData;
    isEdit = false;
    public loading = false;  
   
    constructor(
        public dialogRef: MdDialogRef<AddCrDialogComponent>,
        private crListService: CrListService
    ) {
        this.crData = new CrData(new ChangeRequest(null, null), null);
    }

    addRow() {              
        this.crListService.addCrData(this.crData).then(async =>{
       //afer adding a new CR, refresh  _crDatas
       this.crListService.getAllChangeRequests()
        .subscribe(results => {
          this.loading = false;
          this.crListService.updateChangeRequestList(results);      
    })})};

}