/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { MobData } from './mob-list.service';

export class CrData {
  //  id: number;
  //  name: string;
    changeRequest: ChangeRequest;
    mobId: number;
    //mobDatas: MobData[];
    constructor(changeRequest, mobId){
        this.changeRequest = changeRequest;
        this.mobId = mobId;
    }
}

export class ChangeRequest {
    constructor(id, name){
        
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}


@Injectable()
export class CrListService {
    private _crDatas: CrData[] = [];
    
    constructor(private http: Http) {
    }

    addCrData (crData: CrData): Promise<Response> {
        this._crDatas.push(crData);
        const headers = new Headers({ 'Content-Type': 'application/json' });        
        const changeRequest = new ChangeRequest(null, crData.changeRequest.name);
        return this.http.post(environment.changeRequestService.url,
            JSON.stringify(new ChangeRequest(null, crData.changeRequest.name)), { headers: headers })
            .toPromise()
            .then((response) => {
                console.log(response);
                return response.json().data as string;
            })
            .catch(this.handleError);
    }    
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    get crDatas(): CrData[]{
        return this._crDatas;
    }

    getAllChangeRequests(){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .get(environment.changeRequestGetAllService.url)
            .map(res => res.json());
    }

    updateChangeRequestList(results) {
        this._crDatas=[];
        for (var i=0; i < results.length; i++)        {
            this._crDatas.push(new CrData(new ChangeRequest(results[i].id, results[i].name),
                           null));
        }
        
    }

    getAllMopsForChangeRequest(crData:CrData){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .get(environment.changeRequestGetAllMopService.url + '/' + crData.changeRequest.id)
            .map(res => res.json());
    }
   
}