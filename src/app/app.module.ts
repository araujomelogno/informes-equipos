import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push';

import { ConferenceApp } from './app.component';
import { SurveyProvider } from '../providers/survey-provider';
import { PausedSurveysPage } from '../pages/paused-surveys/paused-surveys';
import { SurveyHolder } from '../services/SurveyHolder';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { CatalogViewPage } from '../pages/catalog-view/catalog-view';
import { PrizeListPage } from '../pages/prize-list/prize-list';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';



import { GridQuestionPage } from '../pages/grid-question/grid-question';
import { MultipleChoiceQuestionPage } from '../pages/multiple-choice-question/multiple-choice-question';
import { RangeQuestionPage } from '../pages/range-question/range-question';
import { SingleChoiceQuestionPage } from '../pages/single-choice-question/single-choice-question';
import { TextBoxQuestionPage } from '../pages/text-box-question/text-box-question';
import { TextFieldQuestionPage } from '../pages/text-field-question/text-field-question';
import { CompletedSurveysPage } from '../pages/completed-surveys/completed-surveys';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
 
import { AuthProvider } from '../providers/auth/auth';
 

@NgModule({
  declarations: [
    PausedSurveysPage,
    GridQuestionPage,
    MultipleChoiceQuestionPage,
    RangeQuestionPage,
    EditProfilePage,
    SingleChoiceQuestionPage,
    TextBoxQuestionPage,
    TextFieldQuestionPage,
    CompletedSurveysPage,
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    HomePage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ResetPasswordPage,
    CatalogViewPage,
    PrizeListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: EditProfilePage, name: 'EditProfilePage', segment: 'profile' },
        { component: HomePage, name: 'HomePage', segment: 'home' },
        { component: CompletedSurveysPage, name: 'CompletedSurveysPage', segment: 'home' },
        { component: PausedSurveysPage, name: 'PausedSurveysPage', segment: 'home' },
        { component: PrizeListPage, name: 'PrizeListPage', segment: 'home' },
        { component: CatalogViewPage, name: 'CatalogViewPage', segment: 'home' }
      ]
    }),
     
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PausedSurveysPage,
    GridQuestionPage,
    MultipleChoiceQuestionPage,
    RangeQuestionPage,
    SingleChoiceQuestionPage,
    TextBoxQuestionPage,
    TextFieldQuestionPage,
    CompletedSurveysPage,
    EditProfilePage,
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    HomePage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ResetPasswordPage,
    PrizeListPage,
    CatalogViewPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    SurveyHolder,
    SurveyProvider,
    AuthProvider,
    Push
  ]
})
export class AppModule { }
