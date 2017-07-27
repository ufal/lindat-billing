import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserDataService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserDataService,
        private alertService: AlertService) { }

    register() {
        if (this.isValid(this.model.password)) {
            this.loading = true;
            this.userService.addUser(this.model)
                .subscribe(
                    data => {
                        // set success message and pass true paramater to persist the message after redirecting to the login page
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
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