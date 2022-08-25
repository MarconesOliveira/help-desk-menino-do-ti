import App from './App.js';

//Call an environment variable
const port = process.env.PORT || 3000;
//Turn on the app
App.listen(port, () => (console.log("App running at port " + port)));
