import {
    Component,
    OnInit
} from '@angular/core';
import { APPCONFIG } from '../../config';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Colaborador } from '../../_models/Colaborador';

@Component({
  selector: 'my-app-header',
  styles: [],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {
  public AppConfig: any;
    public currentUser: Colaborador;

    constructor(private router: Router,
                private authService: AuthService) {
  }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
      this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.router.navigate(['extra/login']);
  }
}
