import { inject, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MobData } from '../service/mob-list.service';
import { CrListService, CrData, ChangeRequest } from '../service/cr-list.service';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable  } from 'rxjs/Observable';
import { ResponsiblePerson } from './mob-list.service';


describe('when add change request', () => {
    const fakeSentStatus = [true, false, true];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                { provide: XHRBackend, useClass: MockBackend },
                {
                  provide: Http,
                  useFactory: (backend, options) => new Http(backend, options),
                  deps: [MockBackend, BaseRequestOptions]
                },
                CrListService
            ]
        })
        .compileComponents();
    }));
    it('Services are injected correctly', async(inject(
        [CrListService, MockBackend], (service, mockBackend) => {
        expect(service).toBeDefined();
        expect(service.http).toBeDefined();
        expect(service.http.post).toBeDefined();
    })));

    it('Response is fetched correctly', async(inject(
        [CrListService, MockBackend], (service, mockBackend) => {
        const fakeStatusData = "OK";
        const options = new ResponseOptions({status: 200, body: {data: fakeStatusData}});
        const response = new Response(options);
        var changeRequest = new ChangeRequest(null, 'Change Request 1');
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.addCrData(new CrData(changeRequest, null)).then(status => {
                expect(status).toEqual(fakeStatusData,
                  'should have expected no. of status');
              });
    })));   
   
});

