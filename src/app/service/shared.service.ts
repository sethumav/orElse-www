import { Injectable } from '@angular/core';
import { CrData } from '../service/cr-list.service';


@Injectable()
export class SharedService {
  globalEmailSubject: string;
  globalBridgeInformation: string;
  globalCrData: CrData;

  constructor() {    
  }

 updateGlobalEmailSubject(emailSubject){
    this.globalEmailSubject=emailSubject;
  }

  getGlobalEmailSubject(){
    return this.globalEmailSubject;
  }

  updateGlobalBridgeInformation(bridgeInfo){
    this.globalBridgeInformation=bridgeInfo;
  }

  getGlobalBridgeInformation(){
    return this.globalBridgeInformation;
  }

  updateGlobalCrData(crData){
    this.globalCrData = crData;
    
  }

  getGlobalCrData(){
    return this.globalCrData;    
  }

}
