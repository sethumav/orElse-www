
import { ResponsiblePerson } from './mob-list.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
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
    private from: ResponsiblePerson;
    private http: Http;
    constructor(http: Http) {
        this.from = new ResponsiblePerson('Brain Trust', 'braintrust@wsib.on.ca');
        this.http = http;
    }
    sendEmails(subject: string, emailBody: string, emailNameAddresses: ResponsiblePerson[]): Promise<boolean[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post(environment.emailService,
                JSON.stringify(new EmailRequest(this.from, subject, emailBody, emailNameAddresses)), { headers: headers })
            .toPromise()
            .then((response) => {
                console.log(response);
                // assume always success for now
                for(const rp in emailNameAddresses){
                    emailNameAddresses[rp].sent = true;
                }
                return response.json().data as boolean[];
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}