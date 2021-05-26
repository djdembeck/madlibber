import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-login",
	templateUrl: "./user-login.component.html",
	styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
	@Input() settings;
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

	onLoginSubmit() {
		this._http.userLogin(this.user).subscribe((data: any) => {
			console.log("logged in", data);
			if (data._id) {
				console.log(data)
				localStorage.setItem("user", JSON.stringify(data));
				this._router.navigate(["/"]);
			} else {
				this.userError = data;
				console.log(this.userError);
			}
		});
	}
}
