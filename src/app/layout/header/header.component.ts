import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app-header',
  styles: [],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }

  logout() {
    this.router.navigate(['extra/login']);
  }
}
