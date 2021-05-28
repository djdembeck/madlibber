import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { localStorage } from "localStorage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { UserLoginComponent } from "./user-login/user-login.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserTopComponent } from "./user-top/user-top.component";
import { MadlibTopComponent } from "./madlib-top/madlib-top.component";
import { MadlibCreateComponent } from "./madlib-create/madlib-create.component";
import { MadlibListComponent } from "./madlib-list/madlib-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./http.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MadlibShowComponent } from "./madlib-show/madlib-show.component";
import { ActiveUserService } from "./active-user.service";

@NgModule({
	declarations: [
		AppComponent,
		UserLoginComponent,
		UserRegistrationComponent,
		UserEditComponent,
		UserProfileComponent,
		UserTopComponent,
		MadlibTopComponent,
		MadlibCreateComponent,
		MadlibListComponent,
		DashboardComponent,
		NavbarComponent,
		MadlibShowComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [HttpService, ActiveUserService],
	bootstrap: [AppComponent],
})
export class AppModule {}
