import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
	constructor(private _router: Router) {}

	user = localStorage.getItem("user");

	ngOnInit() {}

	logout() {
		localStorage.removeItem("user");
		this.user = "";
		this._router.navigateByUrl("/", { skipLocationChange: true });
	}
}