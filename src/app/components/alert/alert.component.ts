import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../services/alert.service";
import { Alert, AlertType } from "../../Alert";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert?: Alert;
  subcription!: Subscription;

  constructor(private alertAservice: AlertService) {
    // Subscribe to new alerts
    this.subcription = this.alertAservice.onAlert().subscribe(alert => {
      this.alert = alert;

      setTimeout(() => this.removeAlert(), 2000);
    })
  }

  ngOnInit(): void {
  }

  removeAlert() {
    this.alert = undefined;
  }

  getClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'alert-success',
        [AlertType.Error]: 'alert-danger',
        [AlertType.Info]: 'alert-info',
        [AlertType.Warning]: 'alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }

}
