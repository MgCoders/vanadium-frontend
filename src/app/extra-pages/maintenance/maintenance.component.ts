import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { UserService } from '../../_services/user.service';
import { userInfo } from 'os';

@Component({
  selector: 'my-page-maintenance',
  styles: [],
  templateUrl: './maintenance.component.html'
})

export class PageMaintenanceComponent implements OnInit {
  public AppConfig: any;


  constructor(private userService: UserService) {}

  ngOnInit() {
    this.AppConfig = APPCONFIG;
    this.userService.ping(); // TODO: sacar
  }
}
