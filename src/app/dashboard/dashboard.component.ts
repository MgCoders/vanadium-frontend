import {
    Component,
    OnInit
} from '@angular/core';
import { NotificacionService } from '../_services/notificacion.service';
import { Notificacion } from '../_models/Notificacion';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';
import { LayoutService } from '../layout/layout.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    notificaciones: Notificacion[];

    constructor(private notificacionService: NotificacionService,
                private authService: AuthService,
                private alertService: AlertService,
                private layoutService: LayoutService) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticatedAndAdmin()) {
            this.layoutService.updatePreloaderState('active');
            this.notificacionService.getAll().subscribe(
                (data) => {
                    this.notificaciones = data;
                    this.layoutService.updatePreloaderState('hide');
                },
                (error) => {
                    this.alertService.error(error, 5000);
                    this.layoutService.updatePreloaderState('hide');
                }
            );
        } else {

            let fechaDesde: Date;
            fechaDesde = new Date();
            fechaDesde.setDate(fechaDesde.getDate() - 1);
            this.layoutService.updatePreloaderState('active');
            this.notificacionService.getPorUsuarioYFecha(this.authService.getCurrentUser(), fechaDesde, new Date()).subscribe(
                (data) => {
                    this.notificaciones = data;
                    this.layoutService.updatePreloaderState('hide');
                },
                (error) => {
                    this.alertService.error(error, 5000);
                    this.layoutService.updatePreloaderState('hide');
                }
            );
        }
    }

}
