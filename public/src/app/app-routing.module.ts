import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserTopComponent } from "./user-top/user-top.component";
import { MadlibTopComponent } from "./madlib-top/madlib-top.component";
import { MadlibCreateComponent } from "./madlib-create/madlib-create.component";
import { MadlibListComponent } from "./madlib-list/madlib-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MadlibShowComponent } from "./madlib-show/madlib-show.component";

const routes: Routes = [
	{ path: "", component: DashboardComponent },
	{ path: "register", component: UserRegistrationComponent },
	{ path: "login", component: UserLoginComponent },
	{ path: "user/edit/:id", component: UserEditComponent },
	{ path: "lib/create", component: MadlibCreateComponent },
	{ path: "user/:id", component: UserProfileComponent },
	{ path: "lib/:id", component: MadlibShowComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
