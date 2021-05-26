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

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _httpService: HttpService
	) {
		this.user = {};
	}
	madlib = { title: "", blanks: [], value: [] };

	ngOnInit() {
		this.newMadlib = { madlib: "" };
		this.madlib = { title: "", blanks: [], value: [] };
		this.object = localStorage.getItem("user");
		this.user = JSON.parse(this.object);
		this.getAMadLib();
	}

	// Generate madlib from API call
	getAMadLib() {
		this._httpService.genMadLib().subscribe((data) => {
			this.madlib = data;
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
	validateWords(newStr = "") {
		return new Promise((resolve) => {
			// Loop through all expected inputs
			let count = 0;
			for (let i = 0; i < this.words_field.controls.length; i++) {
				console.log(this.words_field.value[i]);
				// Some http validation here for partOfSpeech
				// Call Words API to maybe validate known types
				this._httpService
					.validateWord(this.words_field.value[i])
					.subscribe((data) => {
						console.log(data);
						// If word partOfSpeech (eg noun) matches expected partOfSpeech from generator
						if (data.results[1].partOfSpeech == this.madlib.blanks[i]) {
							console.log(
								`Word type: ${data.results[1].partOfSpeech}, matches: ${this.madlib.blanks[i]}`
							);
							// Else be lenient and trust the user
						} else {
							console.log("Word types dont match", data);
						}
						// probably add this to logic somewhere
						// Make this blank field the user inputted word
						this.madlib.blanks[i] = this.words_field.value[i];

						newStr += this.madlib.value[i];
						newStr += this.madlib.blanks[i];
						// Keep track if we're at the end of the loop
						count++;
						if (count == this.words_field.controls.length) {
							// Add period since we're at the end, let promise know we are done
							newStr += ".";
							resolve(newStr);
						}
					});
			}
		});
	}

	onNewMadlib() {
		// Call validate words and wait for it to finish
		this.validateWords().then((value) => {
			this.newMadlib = value;
			console.log("component", this.newMadlib);
			this._httpService
				.createMadlib(this.newMadlib, this.user)
				.subscribe((data) => {
					console.log("Got data from post back", data);
				});
		});
	}
}
