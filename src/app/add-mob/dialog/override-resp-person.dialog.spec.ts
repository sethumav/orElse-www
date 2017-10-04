import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OverrideRespPersonDialogComponent } from './override-resp-person.dialog'; 
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MdDialogRef, MdDialogModule } from "@angular/material";
import { Http } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

class MdDialogRefMock {
}

describe("OverrideRespPersonDialogComponent", () => {
  let component: OverrideRespPersonDialogComponent;
  let fixture: ComponentFixture<OverrideRespPersonDialogComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverrideRespPersonDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MdDialogModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock},
        {  provide: Http }
      ]
    })
    .createComponent(OverrideRespPersonDialogComponent);
  }));

  
  it("should create OverrideRespPersonDialogComponent", () => {
    fixture = TestBed.createComponent(OverrideRespPersonDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });  


 it("should display title 'Override Responsible Person'", () => {
    fixture = TestBed.createComponent(OverrideRespPersonDialogComponent);
    component = fixture.componentInstance;    
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;     
    expect(el.textContent).toEqual('Override Responsible Person');
  });   

});