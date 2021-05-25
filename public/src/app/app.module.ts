import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { UserLoginComponent } from "./user-login/user-login.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserTopComponent } from "./user-top/user-top.component";
import { MadlibTopComponent } from "./madlib-top/madlib-top.component";
import { MadlibCreateComponent } from "./madlib-create/madlib-create.component";
import { MadlibListComponent } from "./madlib-list/madlib-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./http.service";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		UserLoginComponent,
		UserRegistrationComponent,
		UserProfileComponent,
		UserEditComponent,
		UserListComponent,
		UserTopComponent,
		MadlibTopComponent,
		MadlibCreateComponent,
		MadlibListComponent,
		DashboardComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [HttpService],
	bootstrap: [AppComponent],
})
export class AppModule {}
