import {
    Component,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'my-page-forgot-password',
    styles: [],
    templateUrl: './new-password.component.html'
})

export class PageNewPasswordComponent implements OnInit {

    model: any = {};

    validationForm: FormGroup;
    formSubmitted = false;

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                public snackBar: MatSnackBar,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.validationForm = this.formBuilder.group({
            password: this.formBuilder.control(null, [Validators.required]),
            token: this.formBuilder.control(null, [Validators.required]),
            email: this.formBuilder.control(null, [Validators.required, Validators.email]),
        });
        this.model['token'] = this.route.snapshot.queryParams['token'] || '';
        this.authService.resetEmail(this.model['token'])
            .subscribe((obj) => {
                    this.model['email'] = obj.email;
                },
                (err) => {
                    this.openSnackBar('Enlace inválido', 'Ok');
                    this.router.navigate(['extra/login']);
                });
        this.validationForm.get('token').disable();
        this.validationForm.get('email').disable();
    }

    cambiar() {
        this.authService.changePassword(this.model['token'], this.model['password'])
            .subscribe((result) => {
                    console.info(result);
                    this.router.navigate(['extra/login']);
                    this.openSnackBar('Contraseña cambiada', 'Ok');
                },
                (err) => {
                    this.openSnackBar(err, 'Ok');
                    this.onResetForm();
                });
    }

    // SnackBar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action);
    }

    onResetForm() {
        this.formSubmitted = false;
        this.validationForm.reset();
    }

}
