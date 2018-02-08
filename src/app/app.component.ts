import { Component, ViewChild } from '@angular/core';

import { Events, AlertController, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

//import { AboutPage } from '../pages/about/about';
//import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
//import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
//import { SignupPage } from '../pages/signup/signup'; 
import { CompletedSurveysPage } from '../pages/completed-surveys/completed-surveys';

import { PausedSurveysPage } from '../pages/paused-surveys/paused-surveys';
import { TutorialPage } from '../pages/tutorial/tutorial';
//import { SchedulePage } from '../pages/schedule/schedule'; 
//import { SpeakerListPage } from '../pages/speaker-list/speake ;
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SurveyHolder } from '../services/SurveyHolder';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AuthProvider } from '../providers/auth/auth';
import firebase from 'firebase';

import { CatalogViewPage } from '../pages/catalog-view/catalog-view';
import { PrizeListPage } from '../pages/prize-list/prize-list';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

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
    //{ title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    //{ title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    //{ title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' },
    //{ title: 'Home', name: 'HomePage', component: HomePage, tabComponent: HomePage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, icon: 'home' },
    { title: 'Editar perfil', name: 'EditProfilePage', component: EditProfilePage, icon: 'contact' },
    { title: 'Encuestas completas', name: 'CompletedSurveysPage', component: CompletedSurveysPage, icon: 'clipboard' },
    { title: 'Encuestas pausadas', name: 'PausedSurveysPage', component: PausedSurveysPage, icon: 'clock' },
    { title: 'Mis premios', name: 'PrizeListPage', component: PrizeListPage, icon: 'cash' },
    { title: 'Catálogo de premios', name: 'CatalogViewPage', component: CatalogViewPage, icon: 'book' }
  ];


  loggedOutPages: PageInterface[] = [
    // { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    // { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    //{ title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
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
    public splashScreen: SplashScreen,
    public surveyHolder: SurveyHolder, public push: Push
  ) {

    firebase.initializeApp({
      apiKey: "AIzaSyDJpHa4izPVX6iU9w7YDBJEOpnmCrCDZwM",
      authDomain: "equipospregunta.firebaseapp.com",
      databaseURL: "https://equipospregunta.firebaseio.com",
      projectId: "equipospregunta",
      storageBucket: "equipospregunta.appspot.com",
      messagingSenderId: "332351806740"
    });


    /*
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = LoginPage;
        }
        this.platformReady()
      });
    */


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
      this.platformReady()

      this.surveyHolder.setNav(this.nav);
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

  openTutorial() {
    this.nav.setRoot(TutorialPage);
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
    const options: PushOptions = {
      android: { 
        senderID:'332351806740'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      alert(registration.registrationId);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
  logout() {
    this.authProvider.logoutUser();
    this.nav.setRoot(LoginPage);
  }

  pauseSurvey() {
    let alert = this.alertCtrl.create({
      title: 'Desea pausar la encuesta?',
      subTitle: 'Podrá seguir respondiendo la encuesta luego.',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.menu.enable(false, 'surveyMenu');
          this.menu.enable(true, 'loggedInMenu');
          let surveyData = this.surveyHolder.getSurveyDataToLocallyPersist();
          this.storage.set(<string>surveyData.survey.title, surveyData);
          this.storage.get('surveyList').then((value) => {
            if (!value) {
              let surveyList: { surveyName: string, pausedDate: Date }[] = [];
              surveyList.push({ surveyName: <string>surveyData.survey.title, pausedDate: new Date() });
              this.storage.set('surveyList', surveyList);
            } else {
              let surveyList: { surveyName: string, pausedDate: Date }[] = value;
              surveyList.push({ surveyName: <string>surveyData.survey.title, pausedDate: new Date() });
              this.storage.set('surveyList', surveyList);
            }
          });


          this.nav.setRoot(HomePage);
        }
      }, {
        text: 'No',
        role: 'cancel'
      }
      ]
    });
    alert.present();
  }

  abortSurvey() {
    let alert = this.alertCtrl.create({
      title: 'Desea abortar la encuesta?',
      subTitle: 'Si aborta la encuesta se perderan las respuestas ingresadas.',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.menu.enable(false, 'surveyMenu');
          this.menu.enable(true, 'loggedInMenu');
          this.nav.setRoot(HomePage);
        }
      }, {
        text: 'No',
        role: 'cancel'
      }
      ]
    });
    alert.present();
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
