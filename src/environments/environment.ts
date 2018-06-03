// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
  	apiKey: "AIzaSyBGgl-JgrSrGW5crjkTClMKlIMrBScHib8",
    authDomain: "healthathome-238fa.firebaseapp.com",
    databaseURL: "https://healthathome-238fa.firebaseio.com",
    projectId: "healthathome-238fa",
    storageBucket: "healthathome-238fa.appspot.com",
    messagingSenderId: "998628470403"
  }
};
