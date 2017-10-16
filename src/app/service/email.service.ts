
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

class FormattedMobData {
        formattedSection: string;
        formattedTask: string;
        formattedApplication: String;
        formattedStartTime: String;
        formattedEndTime: String;
        formattedEnvironment: string;
        formattedResourceGroup: string;
        formattedComment: string;
        formattedRespPersons: ResponsiblePerson[];
        formattedPreValidation: String;
        formattedPostValidation: String;
        formattedBridgeInfo: string;
        formattedSubject: string;
        formattedHasShutdownRestart = false;
        formattedShutDownTime: String;
        formattedRestartTime: String;
    
        constructor(mob: MobData){
            
           this.formattedApplication = mob.application;
           this.formattedEnvironment = mob.environment;
           this.formattedSection = mob.section;
           this.formattedResourceGroup = mob.resourceGroup;
           this.formattedBridgeInfo = mob.bridgeInfo;
           this.formattedComment = mob.comment;
           this.formattedSubject = mob.subject;
           this.formattedTask = mob.task;
           this.formattedHasShutdownRestart = mob.hasShutdownRestart;
           this.formattedRespPersons = new Array<ResponsiblePerson>();
           

          /* if(mob.respPersons!=null){
             for (var i = 0; i < mob.respPersons.length; i++) {
                this.formattedRespPersons[i] = mob.respPersons[i];  
             }            
           }  */         
           this.formattedStartTime = this.formatDate(mob.startTime);        
           this.formattedEndTime =   this.formatDate(mob.endTime);
           this.formattedPreValidation =   this.formatDate(mob.preValidation);
           this.formattedPostValidation =   this.formatDate(mob.postValidation);
           this.formattedShutDownTime =   this.formatDate(mob.shutDownTime);
           this.formattedRestartTime = this.formatDate(mob.restartTime);      
        }
    
        formatDate(inputDate: Date) {
            if (inputDate!= null){
            return inputDate.getMonth() + 1 + "/" +
                inputDate.getDate() + "/" +
                inputDate.getFullYear() + " " +
                inputDate.getHours() + ":" +
                inputDate.getMinutes() + ":" +
                inputDate.getSeconds()
            }
            return null;
        };
        
     
}

export class EmailRequest {
    from: ResponsiblePerson;
    subject: string;
    emailBody: string;
    emailNameAddresses: ResponsiblePerson[];
    constructor(from: ResponsiblePerson, subject: string, emailBody: string, emailNameAddresses: ResponsiblePerson[]) {
        this.from = from;
        if(subject.trim().length < 1){
            this.subject = 'Please confirm your task!';
        } else {
            this.subject = subject;
        }
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
        this.from = new ResponsiblePerson('Bohdan Zaremba', 'Bohdan_Zaremba@wsib.on.ca');
        this.http = http;
        // call loadEmailTemplate to get obserable for fetching email templates, then subscribt it using the replay subject
        this.loadEmailTemplate().subscribe(this.loadEmailTemplateSubject);
    }
    sendEmails(mob: MobData): Promise<boolean[]> {

        
        if(mob.respPersons!=null){
            var formattedMob = new FormattedMobData(mob);
            for (var i = 0; i < mob.respPersons.length; i++) {
               formattedMob.formattedRespPersons[i] = mob.respPersons[i];  
               
                       
       
        const headers = new Headers({ 'Content-Type': 'application/json' });
        // get replay subjet as observable as it is a replaysubject with 1 previous result this will gurrantee that not matter how many time 
        // sendEmails called the template only gets fetched once as the replaysubject will always return the previous result
        return this.loadEmailTemplateSubject.asObservable().map(results => results)
                .mergeMap(templates => {
                    console.log(templates[0].text());
                    console.log(templates[1].text());
                    return this.http
                    .post(environment.emailService,
                        JSON.stringify(new EmailRequest(this.from, Mustache.render(templates[0].text(), formattedMob), Mustache.render(templates[1].text(), formattedMob), formattedMob.formattedRespPersons)), { headers: headers })
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
            }
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