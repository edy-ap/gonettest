import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GonettestSharedModule } from 'app/shared/shared.module';
import { GonettestCoreModule } from 'app/core/core.module';
import { GonettestAppRoutingModule } from './app-routing.module';
import { GonettestHomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GonettestSharedModule,
    GonettestCoreModule,
    GonettestHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GonettestAppRoutingModule,
  ],
  declarations: [MainComponent, ErrorComponent],
  bootstrap: [MainComponent],
})
export class GonettestAppModule {}
