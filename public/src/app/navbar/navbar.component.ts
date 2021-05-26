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
		this.object = localStorage.getItem("user");
		this.user = JSON.parse(this.object);
	}

	logout() {
		localStorage.removeItem("user");
		this.user = "";
		this._router.navigateByUrl("/", { skipLocationChange: true });
	}
}
