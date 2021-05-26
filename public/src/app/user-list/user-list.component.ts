import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
	user: any;
	totalLikes: number;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.user = [];
		this.totalLikes = 0;
	}

	ngOnInit() {
		this.displayMadlib();
	}

	displayMadlib() {
		this._route.params.subscribe((params: Params) => {
			this._httpService.showUser(params["id"]).subscribe((data) => {
				this.user = data;
			});
		});
		for (let i = 0; i < this.user.madlibs.length; i++) {
			this.totalLikes += this.user.madlibs[i].likes;
		}
	}
}
