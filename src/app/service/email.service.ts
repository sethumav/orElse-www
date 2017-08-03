
import { ResponsiblePerson } from './mob-list.service';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
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
        this.from = new ResponsiblePerson('Brain Trust', 'brian_trust@wsib.on.ca');
        this.http = http;
    }
    sendEmails(subject: string, emailBody: string, emailNameAddresses: ResponsiblePerson[]): Promise<boolean>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post('http://localhost:8080/v1/email/send',
                JSON.stringify(new EmailRequest(this.from, subject, emailBody, emailNameAddresses)), { headers: headers })
            .toPromise()
            .then((response) => {
                return true;
            })
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}