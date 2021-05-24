import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MadlibCreateComponent } from "./madlib-create.component";

describe("MadlibCreateComponent", () => {
	let component: MadlibCreateComponent;
	let fixture: ComponentFixture<MadlibCreateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MadlibCreateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MadlibCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
