# Madlibber
Madlibs game with word-type validation using WordsAPI and template generation from Madlibz. Built on the MEAN stack, using Bulma for a fully responsive frontend.

API's used:

- [Words API](https://www.wordsapi.com/)
  - Loosely validate word types: noun, verb, adjective
- [Madlibz](https://github.com/HermanFassett/madlibz):
   - Generate Madlib
   - Get word types for word validation/display.

## Prerequisites:
You need to create the `public/src/environments/environment.ts` file with an API key for the Words API, like so:

```
export const environment = {
    production: false,
    wordsKey: "YOURKEYHERE"
};
```

## Building and running

Run `npm install` in both the `./` and `./public/` folders.

Running this app is a two-step process:
- From the root folder, run `nodemon server.js`
- From the `public` folder, run `ng build`

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.
