import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserHeaderComponent } from './pages/user-header/user-header.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { UserHeroComponent } from './pages/user-hero/user-hero.component';

@NgModule({
  declarations: [AppComponent, UserHomeComponent, UserHeaderComponent, ShopCardComponent, UserHeroComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
