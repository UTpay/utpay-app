import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TutorialPage, WelcomePage, MainPage } from '../pages/pages';

import { User } from '../providers/providers';
import { Settings } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: string}> = [
    { title: 'アカウント', component: 'AccountPage' },
    { title: '送金', component: 'TransferPage' },
    { title: '取引履歴', component: 'TransactionsPage' },
    { title: '設定', component: 'SettingsPage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Search', component: 'SearchPage' }
  ];

  constructor(private translate: TranslateService,
    public platform: Platform,
    public user: User,
    public settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private headerColor: HeaderColor,
    private splashScreen: SplashScreen,
    private storage: Storage
  ) {
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial').then(hasSeenTutorial => {
      console.log('hasSeenTutorial:', hasSeenTutorial);
      if (hasSeenTutorial) {
        // Login if `authToken` exists
        this.storage.get('authToken').then(authToken => {
          console.log('authToken:', authToken);
          if (authToken) {
            this.user.userdata.token = authToken;
            this.rootPage = MainPage;
          } else {
            this.rootPage = WelcomePage;
          }
        });
      } else {
        this.rootPage = TutorialPage;
      }
      this.platformReady();
    });

    this.initTranslate();
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#c29100');
      this.headerColor.tint('#fbc02d');
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
