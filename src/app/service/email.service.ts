
import { ResponsiblePerson } from './mob-list.service';
import { Injectable } from '@angular/core';
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
    constructor() {
        this.from = new ResponsiblePerson('Brain Trust', 'brian_trust@wsib.on.ca');
    }
    sendEmails(subject: string, emailBody: string, emailNameAddresses: ResponsiblePerson[]){
        console.log('Sending emails for:');
        console.log(new EmailRequest(this.from, subject, emailBody, emailNameAddresses));
    }
}