import {MdButtonModule, MdCheckboxModule, MdInputModule, MdTableModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk';

@NgModule({
  imports: [MdButtonModule, MdInputModule, MdTableModule, CdkTableModule],
  exports: [MdButtonModule, MdInputModule, MdTableModule, CdkTableModule]
})
export class AppMaterialModule { }