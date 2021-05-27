import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
	selector: "app-madlib-show",
	templateUrl: "./madlib-show.component.html",
	styleUrls: ["./madlib-show.component.css"],
})
export class MadlibShowComponent implements OnInit {
	madlib: any;
	user: any;
	liked: boolean;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.madlib = { madlib: "", likes: 0 };
		this.user = [];
	}

	ngOnInit() {
		this.liked = true;
    this._route.params.subscribe((params: Params) => {
			this._httpService.showUser(params["id"]).subscribe((data) => {
				this.user = data;
			});
		});
		this.showMadlib();
	}

	showMadlib() {
		this._route.params.subscribe((params: Params) => {
			this._httpService.showMadlibId(params["id"]).subscribe((data) => {
				this.madlib = data;
        for(let lib of this.madlib){
          for(let user of this.user){
            //console.log(user,lib)
            for(let match of user.madlibs){
              //console.log(match,lib)
              if(match._id === lib._id){
                //console.log('matched')
                lib.user = user
                break
              }
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
