import {
  Component,
  OnInit
} from '@angular/core';
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
import { LayoutService } from '../../layout/layout.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'my-page-login',
  styles: [],
  templateUrl: './login.component.html'
})

export class PageLoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;

  validationForm: FormGroup;
  formSubmitted = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private layoutService: LayoutService,
              private as: AlertService) {
  }

  ngOnInit(): void {
    // reset login status
    if (this.authService.getCurrentUser() != null) {
      this.model['email'] = this.authService.getCurrentUser().email;
    }
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
    this.layoutService.updatePreloaderState('active');
    this.authService.login(this.model.email, this.model.password)
      .subscribe((result) => {
        console.info(result);
        this.layoutService.updatePreloaderState('hide');
        if (result === true) {
          this.router.navigateByUrl(this.returnUrl);
          console.log('LOGINA!' + this.returnUrl);
        }
      } ,
      (err) => {
        console.log('NO LOG');
        this.as.error(err, 5000);
        this.onResetForm();
        this.layoutService.updatePreloaderState('hide');
    });
  }

  onResetForm() {
    this.formSubmitted = false;
    this.validationForm.reset();
  }
}
