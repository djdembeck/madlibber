import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-registration",
	templateUrl: "./user-registration.component.html",
	styleUrls: ["./user-registration.component.css"],
})
export class UserRegistrationComponent implements OnInit {
	@Input() settings;
	user: any;
	errors: any;
	firstNameErr: any;
	lastNameErr: any;
	userNameErr: any;
	emailErr: any;
	pwError: any;
	passwordError: any;

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
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
				console.log("user created");
				localStorage.setItem("user_id", data._id);
				localStorage.setItem("user_name", data.user_name);
				this._router.navigate(["/"]);
			}
		});
	}
}
