import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    register() {
        if (this.isValid(this.model.password)) {
            this.loading = true;
            this.authenticationService.addAccount(this.model)
                .subscribe(
                    data => {
                        console.log(data); // debug
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        console.log(error); // debug
                        this.alertService.error(error.json().message.reason);
                        this.loading = false;
                    });
        }
    }

    isValid(password: string)
    {
        if (password.length < 6)
        {
            this.alertService.error('Password must be at least 6 characters long!');
            return false;
        }
        return true;
    }
}