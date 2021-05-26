import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";


@Component({
	selector: "app-user-edit",
	templateUrl: "./user-edit.component.html",
	styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
	@Input()settings
	user: any
	user_to_update: any
	errors: any
	firstNameErr: any
	lastNameErr:any
	userNameErr:any
	emailErr:any
	pwError: any
	passwordError: any

	constructor(
		private _http: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}

	ngOnInit() {
		this.user = {}
		this.user_to_update={}
		this.passwordError = ''
		this.firstNameErr = ''
		this.lastNameErr = ''
		this.userNameErr = ''
		this.emailErr= ''
		this.pwError= ''
	}

	onEditSubmit(){
		this.user_to_update = this.user
		this._http.updateUser(this.user_to_update)
		.subscribe((data:any)=>{
			if (data.errors){
				if (data.errors.first_name)
					this.firstNameErr = data.errors.first_name.message

				if (data.errors.last_name)
					this.lastNameErr = data.errors.last_name.message
				
				if (data.errors.user_name)
					this.userNameErr = data.errors.user_name.message

				if (data.errors.email)
					this.emailErr = data.errors.email.message

				if (data.errors.password)
					this.pwError = data.errors.password.message
			}
			
			else {
				console.log('user edited')
				this._router.navigate(['/'])
			}
		})
	}

	deleteUser(user){
		this._http.deleteUser(user)
		.subscribe(data=>{
			this._router.navigate(['/'])
		})
	}
}
