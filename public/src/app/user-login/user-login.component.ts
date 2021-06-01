import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";
import localStorage from "localStorage";
import { ActiveUserService } from "../active-user.service";

@Component({
	selector: "app-user-login",
	templateUrl: "./user-login.component.html",
	styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
	activeUser: any;
	user_in_storage: any;
	user: any;
	errors: any;
	userError: any;

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _activeUserService: ActiveUserService
	) {}

	ngOnInit() {
		this.user = {};
		this.userError = "";

		this._activeUserService.getActiveUser().subscribe((data) => {
			this.activeUser = data;
		});
	}

	onLoginSubmit() {
		this._http.userLogin(this.user).subscribe((data: any) => {
			if (data._id) {
				this._activeUserService.setActiveUser(data);
				this._router.navigate(["/"]);
			} else {
				this.userError = data;
				console.log(this.userError);
			}
		});
	}
}
