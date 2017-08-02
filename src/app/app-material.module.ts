import {MdButtonModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';

@NgModule({
  imports: [MdButtonModule, MdInputModule],
  exports: [MdButtonModule, MdInputModule]
})
export class AppMaterialModule { }