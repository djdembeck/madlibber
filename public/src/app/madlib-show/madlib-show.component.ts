import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { ActiveUserService } from "../active-user.service";

@Component({
	selector: "app-madlib-show",
	templateUrl: "./madlib-show.component.html",
	styleUrls: ["./madlib-show.component.css"],
})
export class MadlibShowComponent implements OnInit {
	madlib: any;
	users: any;
	liked: boolean;
	activeUser: any

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService,
		private _activeUserService: ActiveUserService
	) {}

	ngOnInit() {
		this.madlib = {
			_id: "",
			madlib: "",
			likes: "",
			user: { _id: "", user_name: "" },
		};
		this.users = [];
		this.liked = true;
		this._httpService.showAllUsers().subscribe((data) => {
			this.users = data;
			console.log(this.users);
		});
		this.showMadlib();
		this._activeUserService.getActiveUser().subscribe((data) => {
			this.activeUser = data;
		});
	}

	showMadlib() {
		this._route.params.subscribe((params: Params) => {
			this._httpService.showMadlibId(params["id"]).subscribe((data) => {
				console.log(data);
				this.madlib = data;
				for (let user of this.users) {
					// console.log(user,this.madlib)
					for (let match of user.madlibs) {
						// console.log(match,this.madlib)
						if (match._id === this.madlib._id) {
							console.log("matched", user);
							this.madlib.user = user;
							break;
						}
					}
				}
			});
		});
	}

	onLikeSubmit() {
		this.madlib.likes++;
		this._httpService.addlikes(this.madlib._id).subscribe((data) => {
			console.log("Got data from the post back", data);
		});
		this.liked = false;
	}
}
