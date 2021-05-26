import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import localStorage from "localStorage";

@Component({
	selector: "app-user-top",
	templateUrl: "./user-top.component.html",
	styleUrls: ["./user-top.component.css"],
})
export class UserTopComponent implements OnInit {
	users: any;

	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.users = [];
		this.showAllUsers();
	}
	showAllUsers() {
		this._httpService.showAllUsers().subscribe((data) => {
			this.users = data;
		});
	}
}
