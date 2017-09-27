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
    it('Services are injected correctly', async(inject(
        [EmailService, MockBackend], (service, mockBackend) => {
        expect(service).toBeDefined();
        expect(service.http).toBeDefined();
        expect(service.http.post).toBeDefined();
        // spyOn(service.http, 'get').and.returnValue(Observable.create(function (obs) { obs.next(1); }));
        // service.sendEmails(new MobData());
        // expect(service.http.get).toHaveBeenCalled();
    })));

    it('Responose is fetched correctly', async(inject(
        [EmailService, MockBackend], (service, mockBackend) => {
        const fakeEmailSendStatusData = [true, false, true];
        const options = new ResponseOptions({status: 200, body: {data: fakeEmailSendStatusData}});
        const response = new Response(options);
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.sendEmails(new MobData()).then(status => {
                expect(status.length).toBe(fakeEmailSendStatusData.length,
                  'should have expected no. of status');
              });
    })));


    it('Response status code is not one of invalid codes', async(inject(
        [EmailService, MockBackend], (service, mockBackend) => {
        const fakeEmailSendStatusCode = [400, 401, 403];
        const options = new ResponseOptions({status: 200, body: {data: fakeEmailSendStatusCode}});
        const response = new Response(options);
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.sendEmails(new MobData()).then(status => {
                expect(status).not.toContain(fakeEmailSendStatusCode,
                  'should have valid status code');
              });
    })));
   
});

