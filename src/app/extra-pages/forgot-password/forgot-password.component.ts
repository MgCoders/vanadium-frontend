import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'my-page-forgot-password',
  styles: [],
  templateUrl: './forgot-password.component.html'
})

export class PageForgotPasswordComponent implements OnInit {
  ngOnInit(): void {
    this.buildForm();
  }

  model: any = {};
  validationForm: FormGroup;
  formSubmitted = false;

  constructor(private authService: AuthService,
              public snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  buildForm() {
    this.validationForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
    });
  }

  reset() {
    this.formSubmitted = true;
    this.authService.resetPassword(this.model.email)
        .subscribe((result) => {
              this.openSnackBar('Te enviamos un email', 'Ok');
              this.router.navigate(['extra/login']);
            },
            (err) => {
              this.openSnackBar('Email no registrado', 'Ok');
              this.onResetForm();
            });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onResetForm() {
    this.formSubmitted = false;
    this.validationForm.reset();
  }

}
