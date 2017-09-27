import { Injectable } from '@angular/core';


@Injectable()
export class SharedService {
  globalEmailSubject: string;
  globalBridgeInformation: string;

  constructor() { }

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

}
