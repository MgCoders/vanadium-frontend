import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'my-page-login',
  styles: [],
  templateUrl: './login.component.html'
})

export class PageLoginComponent {

  constructor(private _userService: UserService) {
  }
}
