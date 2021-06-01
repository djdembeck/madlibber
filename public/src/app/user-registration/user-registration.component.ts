import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ActiveUserService } from "../active-user.service";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-registration",
	templateUrl: "./user-registration.component.html",
	styleUrls: ["./user-registration.component.css"],
})
export class UserRegistrationComponent implements OnInit {
	@Input() settings;
	user: {};
	errors: any;
	firstNameErr: any;
	lastNameErr: any;
	userNameErr: any;
	emailErr: any;
	pwError: any;
	passwordError: any;
	activeUser: any;

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _activeUserService: ActiveUserService
	) {}

	ngOnInit() {
		this.user = {};
		this.passwordError = "";
		this.firstNameErr = "";
		this.lastNameErr = "";
		this.userNameErr = "";
		this.emailErr = "";
		this.pwError = "";
	}

	onRegSubmit() {
		this._http.createUser(this.user).subscribe((data: any) => {
			if (data.errors) {
				if (data.errors.first_name)
					this.firstNameErr = data.errors.first_name.message;

				if (data.errors.last_name)
					this.lastNameErr = data.errors.last_name.message;

				if (data.errors.user_name)
					this.userNameErr = data.errors.user_name.message;

				if (data.errors.email) this.emailErr = data.errors.email.message;

				if (data.errors.password) this.pwError = data.errors.password.message;
			} else if (data == false)
				this.passwordError = "Password does not match confirm password.";
			else {
				// console.log("user created");
				this._activeUserService.setActiveUser(data);
				this._router.navigate(["/"]);
			}
		});
	}
}
