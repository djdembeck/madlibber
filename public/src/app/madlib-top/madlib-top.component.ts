import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-madlib-top",
	templateUrl: "./madlib-top.component.html",
	styleUrls: ["./madlib-top.component.css"],
})
export class MadlibTopComponent implements OnInit {
	madlibs: any;
	users: any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.madlibs = [];
		this.users = [];
	}

	ngOnInit() {
		this._httpService.showAllUsers().subscribe((data) => {
			this.users = data;
			this.showMadlibs();
		});
	}

	showMadlibs() {
		this._httpService.top5Madlibs().subscribe((data) => {
			// console.log("Got madlibs", data);
			this.madlibs = data;
			for (let lib of this.madlibs) {
				for (let user of this.users) {
					// console.log(user,lib)
					for (let match of user.madlibs) {
						// console.log(match,lib)
						if (match._id === lib._id) {
							// console.log('matched')
							lib.user = user;
							break;
						}
					}
				}
			}
			console.log(this.madlibs);
		});
	}
}
