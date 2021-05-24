import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MadlibTopComponent } from "./madlib-top.component";

describe("MadlibTopComponent", () => {
	let component: MadlibTopComponent;
	let fixture: ComponentFixture<MadlibTopComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MadlibTopComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MadlibTopComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
