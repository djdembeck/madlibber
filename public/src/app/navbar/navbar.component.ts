import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActiveUserService } from "../active-user.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	activeUser: any;

	constructor(
		private _router: Router,
		private _activeUserService: ActiveUserService
	) {}

	ngOnInit() {
		if (localStorage.getItem("activeUser")) {
			// this._activeUserService.setActiveUser(localStorage.getItem('activeUser'))
			this.activeUser = JSON.parse(localStorage.getItem("activeUser"));
			this._activeUserService.setUserFromStorage(this.activeUser);
			// console.log(this.activeUser);
		}
		this._activeUserService.getActiveUser().subscribe((data) => {
			this.activeUser = data;
			// console.log("from navbar:", this.activeUser);
		});
	}

	logout() {
		localStorage.removeItem("user");
		this._activeUserService.clearActiveUser(this.activeUser);
		location.reload();
	}
}
