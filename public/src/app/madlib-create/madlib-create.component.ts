import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { FormArray, FormControl } from "@angular/forms";

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
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.user = {};
	}
	madlib = { title: "", blanks: [], value: [] };

	ngOnInit() {
		this.newMadlib = { title: "", madlib: "" };
		this.madlib = { title: "", blanks: [], value: [] };
		this.blanks_copy = [...this.madlib.blanks]
		this.user = {"_id": localStorage.getItem("user_id"), "user_name": localStorage.getItem("user_name")}
		this.getAMadLib();
	}

	// Generate madlib from API call
	getAMadLib() {
		this._httpService.genMadLib().subscribe((data) => {
			this.madlib = data;
			console.log("Here's the madlib we got from API", data)
			this.addWord();
		});
	}

	// Create inputs for each blank of madlib
	addWord() {
		for (let i = 0; i < this.madlib.blanks.length; i++) {
			this.words_field.push(new FormControl(""));
		}
	}

	// Try to match each word user inputs to the correct type of word the generator expects
	validateWords() {
		return new Promise<void>((resolve) => {
			// Loop through all expected inputs
			var count = 0;
			
			for (let i = 0; i < this.words_field.controls.length; i++) {
				console.log(this.words_field.value[i]);
				// Some http validation here for partOfSpeech
				// Call Words API to maybe validate known types
				this._httpService
					.validateWord(this.words_field.value[i])
					.subscribe((data) => {
						console.log(data);
						// If word partOfSpeech (eg noun) matches expected partOfSpeech from generator
						if (data.results && data.results[0].partOfSpeech) {
							if (data.results[0].partOfSpeech == this.madlib.blanks[i]) {
								console.log(
									`Word type: ${data.results[0].partOfSpeech}, matches: ${this.madlib.blanks[i]}`
								);
								// Else be lenient and trust the user
							} else {
								console.log("Word types dont match", data);
							}
						} else {
							console.log("No part of speech data from API")
						}
						// probably add this to logic somewhere
						// Make this blank field the user inputted word
						this.blanks_copy[i] = this.words_field.value[i];

						// Keep track if we're at the end of the loop
						if (count == this.words_field.controls.length - 1) {
							// Let promise know we are done
							resolve();
						}
						count++;
					});
			}
		});
	}

	onNewMadlib() {
		// Call validate words and wait for it to finish
		this.validateWords().then((value) => {
			let newStr = "";
			for (let i = 0; i < this.words_field.controls.length; i++) {
				newStr += this.madlib.value[i];
				newStr += this.blanks_copy[i];
				// Add last value line if at the end of array
				if (i == this.words_field.controls.length - 1) {
					newStr += this.madlib.value[i+1]
				}
			}
			this.newMadlib = {title: this.madlib.title, madlib: newStr};
			console.log("newstring", this.newMadlib);
			this._httpService
				.createMadlib(this.newMadlib, this.user)
				.subscribe((data) => {
					console.log("Got data from post back", data);
					this._router.navigate(["/"]);
				});
		});
	}
}
