import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AddMobDialogComponent } from './add-mob.dialog'; 
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MdDialogRef, MdDialogModule } from "@angular/material";
import { MobListService } from '../../service/mob-list.service';
import { SharedService } from '../../service/shared.service';
import { Http } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

class MdDialogRefMock {
}

describe("AddMobDialogComponent", () => {
  let component: AddMobDialogComponent;
  let fixture: ComponentFixture<AddMobDialogComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMobDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MdDialogModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock},
        {  provide: Http },
        MobListService, SharedService
      ]
    })
    .createComponent(AddMobDialogComponent);
  }));

  
  it("should create AddMobDialogComponent", () => {
    fixture = TestBed.createComponent(AddMobDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });  


 it("should display title 'Let the magic begin'", () => {
    fixture = TestBed.createComponent(AddMobDialogComponent);
    component = fixture.componentInstance;    
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;     
    expect(el.textContent).toEqual('Let the magic begin!');
  });  


  it("should have 3 environment values", () => {
    fixture = TestBed.createComponent(AddMobDialogComponent);
    component = fixture.componentInstance;
    expect(component.environments.length).toEqual(3);
  });   

});