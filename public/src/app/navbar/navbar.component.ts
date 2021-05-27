import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	constructor(private _router: Router) {}

	object: any;
	user: any;

	ngOnInit() {
		this.user = {"_id": localStorage.getItem("user_id"), "user_name": localStorage.getItem("user_name")}
	}

	logout() {
		localStorage.clear();
		this.user = "";
		this._router.navigateByUrl("/", { skipLocationChange: true });
	}
}
