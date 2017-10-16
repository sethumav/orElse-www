import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AddCrDialogComponent } from './add-cr.dialog'; 
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MdDialogRef, MdDialogModule } from "@angular/material";
import { CrListService } from '../../service/cr-list.service';
import { SharedService } from '../../service/shared.service';
import { FormsModule} from '@angular/forms';

import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

class MdDialogRefMock {
}

describe("AddMobDialogComponent", () => {
  let component: AddCrDialogComponent;
  let fixture: ComponentFixture<AddCrDialogComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MdDialogModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock},
        CrListService
      ]
    })
    .createComponent(AddCrDialogComponent);
  }));

  
  it("should create AddCrDialogComponent", () => {
    fixture = TestBed.createComponent(AddCrDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });  


 it("should display title 'Let the magic begin'", () => {
    fixture = TestBed.createComponent(AddCrDialogComponent);
    component = fixture.componentInstance;    
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;     
    expect(el.textContent).toEqual('Let the magic begin!');
  });
  
});