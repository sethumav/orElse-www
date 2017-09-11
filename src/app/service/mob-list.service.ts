/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../environments/environment';
import { Headers, Http, Response } from '@angular/http';

export class ResponsiblePerson {
    constructor(name: string, email: string){
        this.email = email;
        this.name = name;
        this.sent = false;
    }
    email: string;
    name: string;
    sent: boolean;
}
export class MobData {
    section: string;
    task: string;
    application: string;
    startTime: Date;
    endTime: Date;
    environment: string;
    resourceGroup: string;
    comment: string;
    respPersons: ResponsiblePerson[];
    preValidation: Date;
    postValidation: Date;
    bridgeInfo: string;
    hasShutdownRestart = false;
    shutDownRestartTime: Date;

}


@Injectable()
export class MobListService {
    private _mobDatas: MobData[] = [];
    constructor(private http: Http) {
    }
    addMobData(mobData: MobData) {
        this._mobDatas.push(mobData);
    }
    get mobDatas(): MobData[]{
        return this._mobDatas;
    }
    getRespPerson() {
        const requests = [];
        for (const key of Object.keys(this._mobDatas)){
            requests.push(this.getResponsiblePersonRequest(this._mobDatas[key]));
        }
        return Observable.forkJoin(requests);
    }

    updateRespPerson(results) {
        let rps: ResponsiblePerson[];
        for (let i = 0; i < results.length; i++) {
            rps = [];
            for (const p in results[i]) {
                rps.push(new ResponsiblePerson(results[i][p]['name'], results[i][p]['email']));
            }
            this._mobDatas[i].respPersons = rps;
        }
    }
    getResponsiblePersonRequest(mobData: MobData) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .get(environment.responsiblePersonService.url
                + '?' + environment.responsiblePersonService.appParam + '=' + mobData.application
                + '&' + environment.responsiblePersonService.envParam + '=' + mobData.environment)
            .map(res => res.json());
    }
}
