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

	updateUser(user_to_update: any) {
		return this._http.put(`user/update/${user_to_update._id}`, user_to_update);
	}

	deleteUser(user: any) {
		return this._http.delete(`user/delete/${user._id}`);
	}
}
