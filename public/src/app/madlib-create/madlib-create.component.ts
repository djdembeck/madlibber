import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import {
	AbstractControl,
	FormArray,
	FormControl,
	ValidatorFn,
	Validators,
} from "@angular/forms";
import { ActiveUserService } from "../active-user.service";

@Component({
	selector: "app-madlib-create",
	templateUrl: "./madlib-create.component.html",
	styleUrls: ["./madlib-create.component.css"],
})
export class MadlibCreateComponent implements OnInit {
	newMadlib: any;
	user: any;
	words_field = new FormArray([]);
	object: any;
	blanks_copy: any;

	constructor(
		private _router: Router,
		private _httpService: HttpService,
		private _activeUserService: ActiveUserService
		) {
		this.user = {};
	}
	madlib = { title: "", blanks: [], value: [] };

	ngOnInit() {
		this.newMadlib = { title: "", madlib: "" };
		this.madlib = { title: "", blanks: [], value: [] };
		this.blanks_copy = [...this.madlib.blanks];
		this._activeUserService.getActiveUser().subscribe((data) => {
			this.user = data;
		});
		this.getAMadLib();
	}

	// Generate madlib from API call
	getAMadLib() {
		this._httpService.genMadLib().subscribe((data) => {
			this.madlib = data;
			// console.log("Here's the madlib we got from API", data);
			this.addWord();
		});
	}

	// Create inputs for each blank of madlib
	addWord() {
		for (let i = 0; i < this.madlib.blanks.length; i++) {
			this.words_field.push(
				new FormControl("", {
					validators: [
						Validators.required,
						Validators.minLength(3),
						this.validateWords(i),
					],
					// Start validating when user isn't typing in this field
					updateOn: "blur",
				})
			);
		}
	}

	// Try to match each word user inputs to the correct type of word the generator expects
	validateWords(i: number): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			// Only attempt to validate types we know Words API supports
			var known_words = ["adjective", "noun", "verb"];
			let count = 0;
			let wordIsKnown = false;
			while (count < known_words.length) {
				if (this.madlib.blanks[i] == known_words[count]) {
					wordIsKnown = true;
					break;
				}
				count++;
			}
			// If field has known type and has a value
			if (wordIsKnown && control.value) {
				return this._httpService.validateWord(control.value).subscribe(
					(data) => {
						// console.log(data);
						// If valid results AND top result has partOfSpeech key
						if (data.results && data.results[0].partOfSpeech) {
							let count = 0;
							// console.log("Looking for first matching occurence");
							// Run through results array until we run out of results or validate
							while (count < data.results.length) {
								if (data.results[count].partOfSpeech == this.madlib.blanks[i]) {
									// console.log(
									// 	`Word type for ${data.word} result ${count} matches`,
									// 	data.results[count]
									// );
									this.blanks_copy[i] = control.value;
									control.setErrors(null);
									return null;
								} else {
									// console.log(
									// 	`Word type for ${data.word} result ${count} do not match`,
									// 	data.results[count]
									// );
									count++;
								}
								// When we reach the end, give up
								if (count == data.results.length) {
									control.setErrors({
										noWordFound: data.results[0].partOfSpeech,
									});
									return { noWordFound: control.value };
								}
							}
							// If there aren't enough results
						} else {
							control.setErrors({ notEnoughDataFromAPI: control.value });
							return { notEnoughDataFromAPI: control.value };
						}
					},
					// Catch http errors of all kinds and assume user did something wrong
					// Because it's not our fault amirite
					(err) => {
						control.setErrors({ wordNotValid: control.value });
						return { wordNotValid: control.value };
					}
				);
				// Betrayal Can Only Happen If You Trust
			} else {
				this.blanks_copy[i] = control.value;
			}
		};
	}

	onNewMadlib() {
		// Call validate words and wait for it to finish
		let newStr = "";
		for (let i = 0; i < this.words_field.controls.length; i++) {
			newStr += this.madlib.value[i];
			newStr += this.blanks_copy[i];
			// Add last value line if at the end of array
			if (i == this.words_field.controls.length - 1) {
				newStr += this.madlib.value[i + 1];
			}
		}
		this.newMadlib = { title: this.madlib.title, madlib: newStr };
		this._httpService
			.createMadlib(this.newMadlib, this.user)
			.subscribe((data) => {
				console.log("Got data from post back", data);
				this._router.navigate(["/"]);
			});
	}
}
