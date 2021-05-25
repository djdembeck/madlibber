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

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {}
}
