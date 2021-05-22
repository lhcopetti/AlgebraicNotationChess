

import TokenStorage from './TokenStorage';

console.log("Hello from options");

const storage = new TokenStorage();


const elem = document.getElementById("lichessAPIToken") as HTMLInputElement;

storage.getToken().then(token => elem.value = token);

elem.addEventListener('change', (event) => {

    const value = (<HTMLInputElement>event?.target).value;
    storage.setToken(value);
    console.log("Token value: " + value + " saved");
});
