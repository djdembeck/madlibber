import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY } from "rxjs";
import localStorage from "localStorage";

@Injectable({ providedIn: "root" })
export class ActiveUserService {
	activeUser = new BehaviorSubject(null);

	constructor() {}
	getActiveUser() {
		return this.activeUser;
	}
	setActiveUser(activeUser) {
		// console.log("from form:", activeUser);
		this.addUserToLocal(activeUser);
		return this.activeUser.next(activeUser);
	}
	setUserFromStorage(activeUser) {
		// console.log("from storage:", activeUser);
		return this.activeUser.next(activeUser);
	}
	clearActiveUser(data) {
		this.clearUserLocal(data);
		return this.activeUser.next(EMPTY);
	}
	addUserToLocal(data) {
		localStorage.setItem("activeUser", JSON.stringify(data));
	}
	clearUserLocal(data) {
		localStorage.removeItem("activeUser");
	}
}
