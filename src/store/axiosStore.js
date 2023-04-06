import { autorun} from 'mobx';
import axios from 'axios';
// import https from 'https';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// https.globalAgent.options.rejectUnauthorized = false;

class axiosStore {
  url = window.location.origin;
  // url = 'http://127.0.0.1:8000'; // for testing
  token = '';
  // master_password = '';

  instance = axios.create({
    baseURL: window.location.origin,
    // httpsAgent: new https.Agent({
    //   rejectUnauthorized: false,
    // }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Osmedeus foo',
    },
  });

  constructor() {
    autorun(() => {
      const url = window.location.origin;
      this.instance.baseURL = url;
      console.log("this.instance.baseURL", this.instance.baseURL)
      // this.instance.baseURL = 'http://127.0.0.1:8000';  // for testing

      // get the token
      const token = 'Osmedeus ' + window.localStorage.getItem('jwt');
      this.token = 'Osmedeus ' + window.localStorage.getItem('jwt');
      this.instance.defaults.headers['Authorization'] = token;
    });
  }

  setJWT = jwt => {
    const token = 'Osmedeus ' + jwt;
    window.localStorage.setItem('jwt', jwt);
    this.instance.defaults.headers['Authorization'] = token;
  };

  setURL = url => {
    const origin = new URL(url).origin;
    console.log("origin");
    this.url = origin;
    window.localStorage.setItem('url', origin);
    this.instance.defaults.baseURL = origin;
  };

  get checkLogin() {
    return this.isLogged;
  }
}

export default new axiosStore();
