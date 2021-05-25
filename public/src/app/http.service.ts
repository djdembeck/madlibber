import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	constructor(private _http: HttpClient) {}

	createUser(user: any) {
		return this._http.post("/user/register", user);
	}

	userLogin(user: any) {
		return this._http.post(`user/login`, user);
	}

	showUser(id: string) {
		return this._http.get(`user/show/${id}`);
	}

		createMadlib(madlib:any, user:any){
			return this._http.post('/madlibs/add', madlib, user)
		}

		showMadlibId(id:any){
			return this._http.get(`/madlibs/${id}`)
		}

		displayMadlibs(){
			return this._http.get('/madlibs')
		}

		addlikes(id:any){
			return this._http.put(`/madlibs/${id}/likes`, id)
		}
}
