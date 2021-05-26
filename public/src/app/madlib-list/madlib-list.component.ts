import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: "app-madlib-list",
	templateUrl: "./madlib-list.component.html",
	styleUrls: ["./madlib-list.component.css"],
})
export class MadlibListComponent implements OnInit {
	madlibs:any
	users:any
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.madlibs = []
		this.users = []
	}

	ngOnInit() {
		this._httpService.showAllUsers().subscribe(data=>{
			this.users = data
			this.showMadlibs()
        })
	}

	showMadlibs(){
		this._httpService.recentMadlibs()
		.subscribe(data => {
			console.log("Got madlibs", data)
			this.madlibs = data
		})
	}

	
}
