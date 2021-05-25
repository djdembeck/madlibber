import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: "app-madlib-create",
	templateUrl: "./madlib-create.component.html",
	styleUrls: ["./madlib-create.component.css"],
})
export class MadlibCreateComponent implements OnInit {
	newMadlib:any
	user:any
	constructor(
	private _route: ActivatedRoute,
	private _router: Router,
    private _httpService: HttpService
	) {
		this.user = {}
	}
	
	ngOnInit() {
		this.newMadlib = {madlib:''}
		this.getUser()
	}

	getUser(){
		this._route.params.subscribe((params: Params) =>{
			this._httpService.showUser(params['id'])
			.subscribe(data => {
			this.user = data
			})
		})
	}

	onNewMadlib(){
		this._httpService.createMadlib(this.newMadlib, this.user)
		.subscribe(data => {
			console.log('Got data from post back', data)
		})
	}
}
