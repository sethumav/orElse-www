
import { ResponsiblePerson } from './mob-list.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable  } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { MobData } from '../service/mob-list.service';
import * as Mustache from 'mustache';
export class EmailRequest {
    from: ResponsiblePerson;
    subject: string;
    emailBody: string;
    emailNameAddresses: ResponsiblePerson[];
    constructor(from: ResponsiblePerson, subject: string, emailBody: string, emailNameAddresses: ResponsiblePerson[]) {
        this.from = from;
        this.subject = subject;
        this.emailBody = emailBody;
        this.emailNameAddresses = emailNameAddresses;
    }
}

@Injectable()
export class EmailService {
    private emailBodyTemplate;
    private emailSubjectTemplate;
    private from: ResponsiblePerson;
    public http: Http;
    // create a replay subject which always return the previous one result
    private loadEmailTemplateSubject = new ReplaySubject(1);
    constructor(http: Http) {
        this.from = new ResponsiblePerson('Brain Trust', 'braintrust@wsib.on.ca');
        this.http = http;
        // call loadEmailTemplate to get obserable for fetching email templates, then subscribt it using the replay subject
        this.loadEmailTemplate().subscribe(this.loadEmailTemplateSubject);
    }
    sendEmails(mob: MobData): Promise<boolean[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // get replay subjet as observable as it is a replaysubject with 1 previous result this will gurrantee that not matter how many time 
        // sendEmails called the template only gets fetched once as the replaysubject will always return the previous result
        return this.loadEmailTemplateSubject.asObservable().map(results => results)
                .mergeMap(templates => {
                    console.log(templates[0].text());
                    console.log(templates[1].text());
                    return this.http
                    .post(environment.emailService,
                        JSON.stringify(new EmailRequest(this.from, Mustache.render(templates[0].text(), mob), Mustache.render(templates[1].text(), mob), mob.respPersons)), { headers: headers })
                    .toPromise()
                    .then((response) => {
                        console.log(response);
                        // assume always success for now
                        for(const rp in mob.respPersons){
                            mob.respPersons[rp].sent = true;
                        }
                        return response.json().data as boolean[];
                    })
                    .catch(this.handleError);
                }).toPromise();
    }
    
    private loadEmailTemplate(){
        const requests = [];
        requests.push(this.http.get('assets/email.subject.mst').map(res => res));
        requests.push(this.http.get('assets/email.body.mst').map(res => res));
        return Observable.forkJoin(requests);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}