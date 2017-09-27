import { TestBed, inject, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SharedService } from './shared.service';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedService]
    }).compileComponents;
  });

   it('Services are injected correctly', inject(
      [SharedService], (service) => {
    expect(service).toBeDefined();     
}));

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  })); 
      
  it('should set and retreive global email subject correctly', 
                    inject([SharedService], (service: SharedService) => {
    service.updateGlobalEmailSubject('test');
    expect(service.getGlobalEmailSubject()).toEqual('test');
  }));

  it('should set and retreive bridge information correctly', 
          inject([SharedService], (service: SharedService) => {
     service.updateGlobalBridgeInformation('test');
     expect(service.getGlobalBridgeInformation()).toEqual('test');
  }))
  
});
