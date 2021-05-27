import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";
import localStorage from "localStorage";

@Component({
	selector: "app-user-login",
	templateUrl: "./user-login.component.html",
	styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
	user: any;
	errors: any;
	userError: any;

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.user = {};
		this.userError = "";
	}

	public onLoginSubmit() {
		this._http.userLogin(this.user).subscribe((data: any) => {
			console.log(data, "***********");
			if (data._id) {
				// Set user id and name in session
				localStorage.setItem("user_id", data._id);
				localStorage.setItem("user_name", data.user_name);
				this._router.navigate(["/"]);
			} else {
				this.userError = data;
				console.log(this.userError);
			}
		});
	}
}
