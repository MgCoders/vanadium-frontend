import {
  Component,
  OnInit
} from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'my-page-login',
  styles: [],
  templateUrl: './login.component.html'
})

export class PageLoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  validationForm: FormGroup;
  formSubmitted = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.buildForm();
  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      password: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
    });
  }

  login() {
    this.formSubmitted = true;
    this.authService.login(this.model.email, this.model.password)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate([this.returnUrl]);
          console.log('LOGINA!');
        } else {
          this.openSnackBar('Username or password is incorrect', 'Ok')   ;
          this.loading = false;
          this.onResetForm();
        }
      });
  }

  // SnackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onResetForm() {
    this.validationForm.reset();
    this.formSubmitted = false;
  }
}
