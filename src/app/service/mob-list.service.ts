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
import { SharedService } from '../service/shared.service';
import { CrData, ChangeRequest } from '../service/cr-list.service';

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
    id: number;
    changeRequestId: number;
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
    subject: string;
    hasShutdownRestart = false;
    shutDownTime: Date;
    restartTime: Date;

}


@Injectable()
export class MobListService {
    private _mobDatas: MobData[] = [];
    sharedService: SharedService;
    constructor(private http: Http, sharedService: SharedService) {
        this.sharedService = sharedService;
    }
    
    addMobData(mobData: MobData) : Promise<MobData>{
        this._mobDatas.push(mobData); 
        const headers = new Headers({ 'Content-Type': 'application/json' }); 
        mobData.changeRequestId=this.sharedService.getGlobalCrData().changeRequest.id;

        return this.http.post(environment.methodOfProcedureSaveService.url,
            JSON.stringify(mobData), { headers: headers })
            .toPromise()
            .then((response) => {
                console.log(response);
                var crData = new CrData(null, null);
                crData = this.sharedService.getGlobalCrData();
                crData.mobId = response.json().id;
                this.sharedService.updateGlobalCrData(crData);
                console.log(response.json().id);
                return response.json().data as string;
            })
            .catch(this.handleError);
    }       

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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
        console.log("RP Url: " + environment.responsiblePersonService.url);
        return this.http
            .get(environment.responsiblePersonService.url
                + '?' + environment.responsiblePersonService.appParam + '=' + mobData.application
                + '&' + environment.responsiblePersonService.envParam + '=' + mobData.environment)
            .map(res => res.json());
    }

    updateMobDatas(results) {
        this._mobDatas = results;            
    }

    saveMobData(mobData: MobData) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.methodOfProcedureSaveService.url,
            JSON.stringify(mobData), { headers: headers })
            .toPromise()
            .then((response) => {
                console.log(response);
                return response.json().data as string;
            })
            .catch(this.handleError);
    }    

}