import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor(
    public events: Events,
    public storage: Storage
  ) {}

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<void> {
    return this.userProfile.update({
      firstName: firstName,
      lastName: lastName,
    });
  }


  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({
      birthDate: birthDate,
    });
  }


  updateSex(sex: string): Promise<any> {
    return this.userProfile.update({
      sex: sex,
    });
  }



  updateLocation(location: string): Promise<any> {
    return this.userProfile.update({
      location: location,
    });
  }


  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(<string>this.currentUser.email, password);

    return this.currentUser.reauthenticateWithCredential(credential).then(() => {
      this.currentUser.updateEmail(newEmail).then(() => {
        this.userProfile.update({ email: newEmail });
      });
    });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(<string>this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticateWithCredential(credential).then(() => {
      this.currentUser.updatePassword(newPassword).then(() => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

  getCurrentUser(): firebase.User {
    return this.currentUser;

  }


  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };
 
  login(user: firebase.User, up: firebase.database.Reference ): void {
    this.currentUser = user;
    this.userProfile = up;
    this.storage.set(this.HAS_LOGGED_IN, true);
    //let email: any = user.email != null ? user.email : '';
    //this.setUsername(email);
    this.events.publish('user:login');
  };

  
  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
