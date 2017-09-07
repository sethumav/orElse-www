import { inject, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EmailService } from '../service/email.service';
import { MobData } from '../service/mob-list.service';

import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable  } from 'rxjs/Observable';


describe('when sendemail', () => {
    const fakeSentStatus = [true, false, true];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            // imports: [HttpModule],
            providers: [
                MockBackend,
                BaseRequestOptions,
                { provide: XHRBackend, useClass: MockBackend },
                {
                  provide: Http,
                  useFactory: (backend, options) => new Http(backend, options),
                  deps: [MockBackend, BaseRequestOptions]
                },
                EmailService
            ]
        })
        .compileComponents();
    }));
    it('method are called', async(inject(
        [EmailService, MockBackend], (service, mockBackend) => {
        expect(service).toBeDefined();
        expect(service.http).toBeDefined();
        expect(service.http.post).toBeDefined();
        // spyOn(service.http, 'get').and.returnValue(Observable.create(function (obs) { obs.next(1); }));
        // service.sendEmails(new MobData());
        // expect(service.http.get).toHaveBeenCalled();
      })));
});

