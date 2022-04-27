import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from "../Alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private showAlert: boolean = false;
  private subject = new Subject<Alert>();
  
  constructor() { }

  success(message: string) {
    this.alert({
      type: AlertType.Success,
      message: message
    })
  }

  error(message: string) {
    this.alert({
      type: AlertType.Error,
      message: message
    })
  }

  info(message: string) {
    this.alert({
      type: AlertType.Info,
      message: message
    })
  }

  warning(message: string) {
    this.alert({
      type: AlertType.Warning,
      message: message
    })
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }

  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }
}
