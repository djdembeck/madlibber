# Madlibber
Madlibs game with word-type validation using WordsAPI and template generation from Madlibz. Built on the MEAN stack, using Bulma for a fully responsive frontend.






Creation page             |  User profile page
:-------------------------:|:-------------------------:
![screenshot-ec2-18-189-13-193 us-east-2 compute amazonaws com-2021 05 28-15_01_07](https://user-images.githubusercontent.com/71412966/122656359-727e4000-d11f-11eb-915b-7c7e27b42b21.png)  |  ![screenshot-ec2-18-189-13-193 us-east-2 compute amazonaws com-2021 05 28-14_59_35](https://user-images.githubusercontent.com/71412966/122656360-727e4000-d11f-11eb-92ae-ff6b9990c7d6.png)

Single madlib page             |  Dashboard page
:-------------------------:|:-------------------------:
![screenshot-ec2-18-189-13-193 us-east-2 compute amazonaws com-2021 05 28-14_59_21](https://user-images.githubusercontent.com/71412966/122656361-727e4000-d11f-11eb-8f88-7662c5cb9cee.png)  |  ![screenshot-ec2-18-189-13-193 us-east-2 compute amazonaws com-2021 05 28-14_58_50](https://user-images.githubusercontent.com/71412966/122656362-7316d680-d11f-11eb-9b9d-bc409554bfd6.png)

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
