import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ActiveUserService } from "../active-user.service";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
	user: any;
	activeUser: any;
	totalLikes: number;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService,
		private _activeUserService: ActiveUserService
	) {
		this.user = [];
		this.totalLikes = 0;
	}

	ngOnInit() {
		this.displayMadlib();

		this._activeUserService.getActiveUser().subscribe((data) => {
			this.activeUser = data;
		});
	}

	displayMadlib() {
		this._route.params.subscribe((params: Params) => {
			this._httpService.showUser(params["id"]).subscribe((data) => {
				this.user = data;
				for (let i = 0; i < this.user.madlibs.length; i++) {
					this.totalLikes += this.user.madlibs[i].likes;
				}
			});
		});
	}
}
