/** An example database that the data source uses to retrieve data for the table. */
import { Injectable } from '@angular/core';

export class CrData {
    name: string;
}


@Injectable()
export class CrListService {
    private _crDatas: CrData[] = [];
    
    constructor() {
    }

    addCrData(crData: CrData) {
        this._crDatas.push(crData);
    }

    get crDatas(): CrData[]{
        return this._crDatas;
    }
}