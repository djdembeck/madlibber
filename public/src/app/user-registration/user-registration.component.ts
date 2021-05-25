import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-user-registration",
	templateUrl: "./user-registration.component.html",
	styleUrls: ["./user-registration.component.css"],
})
export class UserRegistrationComponent implements OnInit {
	@Input()settings
	user: any
	errors: any

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.user = {}
	}

	onRegSubmit(){
		this._http.createUser(this.user)
		.subscribe((data:any)=>{
			console.log('user created', data)
			if (data.errors){
				console.log(data.errors)
			}
			else {
				this._router.navigate(['/'])
			}
		})
	}
}
