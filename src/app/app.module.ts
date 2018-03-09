import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';


import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { AuthProvider } from '../providers/auth/auth';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,

    HomePage,
    PopoverPage,
    SignupPage,
    ResetPasswordPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: HomePage, name: 'HomePage', segment: 'home' }
      ]
    }),

    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [

    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    HomePage,
    PopoverPage,
    SignupPage,
    ResetPasswordPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AuthProvider
  ]
})
export class AppModule { }
