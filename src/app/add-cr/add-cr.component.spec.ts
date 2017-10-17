import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AddCrComponent } from './add-cr.component'; 
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MdDialogRef, MdDialogModule } from "@angular/material";
import { CrListService } from '../service/cr-list.service';
import { APP_CONTENT } from '../app.content';
import { Http } from '@angular/http';
 
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

class MdDialogRefMock {
}

describe("AddCrComponent", () => {
  let component: AddCrComponent;
  let fixture: ComponentFixture<AddCrComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MdDialogModule, RouterTestingModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock, Router },
        { provide: Http},
          CrListService
      ]
    })
    .compileComponents();
  }));


  it("should create", () => {
    const fixture = TestBed.createComponent(AddCrComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });  

  it(`should have false value for disable close`, async(() => {
    const fixture = TestBed.createComponent(AddCrComponent);
    const app = fixture.componentInstance;
    console.log('app dialog' + app.dialog);
    expect(app.dialogConfig.disableClose).toEqual(false);
  }));
  
});