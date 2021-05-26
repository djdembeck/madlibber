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
	public user_in_storage = localStorage.getItem("user");
	public log_user = JSON.parse(this.user_in_storage);

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
		this.user_in_storage = {};
		this.log_user = {};
	}

	public onLoginSubmit() {
		this._http.userLogin(this.user).subscribe((data: any) => {
			console.log(data, "***********");
			if (data._id) {
				localStorage.setItem("user", JSON.stringify(data));
				const user_in_storage = localStorage.getItem("user");
				const log_user = JSON.parse(user_in_storage);
				// console.log(log_user.user_name)
				this._router.navigate(["/"]);
			} else {
				this.userError = data;
				console.log(this.userError);
			}
		});
	}
}
