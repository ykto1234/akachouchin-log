import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchConditionPrefectureComponent } from './components/search-condition-prefecture/search-condition-prefecture.component';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { AreaShopListComponent } from './pages/area-shop-list/area-shop-list.component';
import { UserHeaderComponent } from './pages/user-header/user-header.component';
import { UserHeroComponent } from './pages/user-hero/user-hero.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserHeaderComponent,
    ShopCardComponent,
    UserHeroComponent,
    SearchConditionPrefectureComponent,
    AreaShopListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
