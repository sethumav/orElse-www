/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class RespPerson{
    constructor(firstName: string, lastName: string, email: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    firstName: string;
    lastName: string;
    email: string;
}
export class MobData {
    section: string;
    task: string;
    application: string;
    startTime: string;
    endTime: string;
    resourceGroup: string;
    anything: string;
    anything1: string;
    anything2: string;
    respPersons: RespPerson[];

}
class MobDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<MobData[]> = new BehaviorSubject<MobData[]>([]);
    get data(): MobData[] { return this.dataChange.value; }

    constructor() {
        // Fill up the database with 100 users.
        // for (let i = 0; i < 100; i++) { this.addMockMobData(); }
    }
    addMobData(mobData: MobData) {
        const copiedData = this.data.slice();
        copiedData.push(mobData);
        console.log(copiedData);
        this.dataChange.next(copiedData);
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

class MobDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: MobDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<MobData[]> {
        return this._exampleDatabase.dataChange;
    }

    disconnect() { }
}


@Injectable()
export class MobListService {
    private _mbDatabase;
    private _mbDataSource;
    constructor() {
        this._mbDatabase = new MobDatabase();
        this._mbDataSource = new MobDataSource(this._mbDatabase);
    }
    get mbDataSource(){
        return this._mbDataSource;
    }
    addMobData(mobData: MobData) {
        this._mbDatabase.addMobData(mobData);
    }
    get data(): MobData[]{
        return this._mbDatabase.data;
    }
    updateRespPerson() {
        for( let i in this.data){ 
            this.data[i].respPersons = [];
            for(let n = 0; n < 3; n++){
                this.data[i].respPersons.push(new RespPerson('James', 'Bond', 'james_bond@wsib.on.ca'));
            }
        }
    }
    upate(){
        this._mbDatabase.dataChange.next(this._mbDatabase.data);
    }
}
