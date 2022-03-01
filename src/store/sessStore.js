import { observable, action, computed, makeObservable } from 'mobx';

class sessStore {
  isLogged = false;
  // @NOTE enable login bypass for now
  // isLogged = true;

  constructor() {
    
// makeObservable(sessStore, {
//   isLogged: observable,
//   checkLogin: computed,
//   setisLogged: action,
//   setLogout: action,
// });
  }

  setisLogged = () => {
    this.isLogged = true;
  };

  setLogout = () => {
    this.isLogged = false;
    window.localStorage.clear();
  };

  get checkLogin() {
    return this.isLogged;
  }
}


export default new sessStore();