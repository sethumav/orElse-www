/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

export class CrData {
    id: number;
    name: string;
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
        const changeRequest = new ChangeRequest(null, crData.name);
        return this.http.post(environment.changeRequestService.url,
            JSON.stringify(new ChangeRequest(null, crData.name)), { headers: headers })
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
        let crl: ChangeRequest[];
        crl = [];
        for (let i = 0; i < results.length; i++) {
            crl.push(new ChangeRequest(results[i]['id'], results[i]['name']));
         }
        this._crDatas = crl;
    }

    getAllMopsForChangeRequest(crData:CrData){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .get(environment.changeRequestGetAllMopService.url + '/' + crData.id)
            .map(res => res.json());
    }
   
}