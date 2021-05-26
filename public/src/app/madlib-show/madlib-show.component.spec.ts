import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MadlibShowComponent } from "./madlib-show.component";

describe("MadlibShowComponent", () => {
	let component: MadlibShowComponent;
	let fixture: ComponentFixture<MadlibShowComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MadlibShowComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MadlibShowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
