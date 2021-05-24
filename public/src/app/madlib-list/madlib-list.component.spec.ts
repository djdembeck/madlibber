import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MadlibListComponent } from "./madlib-list.component";

describe("MadlibListComponent", () => {
	let component: MadlibListComponent;
	let fixture: ComponentFixture<MadlibListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MadlibListComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MadlibListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
