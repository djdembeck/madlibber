import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	constructor(private _http: HttpClient) {}

	// You need to enter an API key to use
	WORD_API_KEY = ""

	createUser(user: any) {
		return this._http.post("/user/register", user);
	}

	userLogin(user: any) {
		return this._http.post(`/user/login`, user);
	}

	showUser(id: string) {
		return this._http.get(`/user/show/${id}`);
	}

	updateUser(user: any) {
		return this._http.put(`/user/update/${user._id}`, user)
	}

	deleteUser(user: any) {
		return this._http.delete(`/user/delete/${user._id}`);
	}

	createMadlib(madlib:any, user:any){
		return this._http.post(`/madlibs/${user._id}/add`, {madlib: madlib})
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

	deleteMadlib(madlib){
		return this._http.delete(`/madlibs/${madlib._id}/remove`)
	}

	genMadLib() {
		return this._http.get<any>(`http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=10`)
	}

	validateWord(word:string) {
		return this._http.get<any>(`https://wordsapiv1.p.rapidapi.com/words/${word}`,{headers: {'X-RapidAPI-key': `${this.WORD_API_KEY}`}})
	}

	recentMadlibs(){
		return this._http.get('/madlibs/recent')
	}

	showAllUsers(){
        return this._http.get('/users')
    }
}