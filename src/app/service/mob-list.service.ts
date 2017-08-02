/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

/** Constants used to fill up our data base. */
const TASKS = ['Unix/Windows team',
'LDAP health check', 'CGI Database Team',
'CGI Oracle DBA',
'Middleware to start',
'Middleware Start Portal on Leg 2',
'Guidwire Applications',
'AM Int/Ext Server', 'IM Int/Ext Server',
'Jenkins', 'Ignite Application server',
'Repository Mgmt Server',
'BMC – RLM Application Server + Validation',
'CGI Network to remove maintenance page',
'email status update to WSIB/CGI',
'WSIB App team to Start Cognos',
'OCC to patch and reboot',
'ESB start up'];

export class MobData {
    task: string;
    application: string;
    startTime: string;
    endTime: string;
    resourceGroup: string;
    anything: string;
    anything1: string;
    anything2: string;

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
    /** Adds a new user to the database. */
    addMockMobData() {
        const copiedData = this.data.slice();
        copiedData.push(this.createNewMobData());
        this.dataChange.next(copiedData);
    }

    /** Builds and returns a new User. */
    private createNewMobData() {
        const task =
            TASKS[Math.round(Math.random() * (TASKS.length - 1))] + ' ' +
            TASKS[Math.round(Math.random() * (TASKS.length - 1))].charAt(0) + '.';

        return {
            // id: (this.data.length + 1).toString(),
            task: task,
            application: 'app_' + task,
            startTime: Math.round(Math.random() * 23).toString() +  ':'  + Math.round(Math.random() * 59).toString(),
            endTime: Math.round(Math.random() * 23).toString() +  ':'  + Math.round(Math.random() * 59).toString(),
            resourceGroup: 'rg_' + task,
            anything: 'anything_' + task,
            anything1: 'anything1_' + task,
            anything2: 'anything2_' + task
        };
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
@Injectable()
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
}
