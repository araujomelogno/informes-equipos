import { Component, ViewChild } from '@angular/core';

import { Events, AlertController, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

//import { AboutPage } from '../pages/about/about';
//import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
//import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
  
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AuthProvider } from '../providers/auth/auth';
import firebase from 'firebase';
 
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    //{ title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' }, 
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, icon: 'home' }
  ];


  loggedOutPages: PageInterface[] = [
    // { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public authProvider: AuthProvider,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen 
  ) {

    firebase.initializeApp({
      apiKey: "AIzaSyAZ-xEeNt1rO_GjDuW7Y5thfSw8UWsXbJQ",
      authDomain: "informes-equipos-consultores.firebaseapp.com",
      databaseURL: "https://informes-equipos-consultores.firebaseio.com",
      projectId: "informes-equipos-consultores",
      storageBucket: "informes-equipos-consultores.appspot.com",
      messagingSenderId: "323003856262"
    });

 


    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.enableMenu(true);
        this.userData.login(user, firebase.database().ref(`/userProfile/${user.uid}`));

        this.rootPage = HomePage;
        unsubscribe();

      }
 
      this.platformReady();
    });


    // load the conference data
    confData.load();

    this.listenToLoginEvents();


  }



  openPage(page: PageInterface) {
    let params = {};
    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }
 
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.pushsetup();
      this.splashScreen.hide();


    });
  }

  pushsetup() {

    if (this.platform.is('cordova')) {

      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: JSON.stringify(jsonData)
        });
        youralert.present();
      };
      window["plugins"].OneSignal
        .startInit("b8679d08-2518-4794-96bc-e006655c96bd", "332351806740")

        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

    }
  }
  logout() {
    this.authProvider.logoutUser();
    this.nav.setRoot(LoginPage);
  }
 
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
