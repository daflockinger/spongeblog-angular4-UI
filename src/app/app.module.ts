import { HttpModule } from '@angular/http';
import { BlogRoutingModule } from './blog-routing.module';
import { CleanUrlUtilsService } from './service/utils/clean-url-utils.service';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { FooterComponent } from './parts/footer/footer.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { PaginationComponent } from './parts/pagination/pagination.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostComponent,
    FooterComponent,
    NavbarComponent,
    PaginationComponent,
    PageComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    Angular2FontawesomeModule,
    HttpClientModule,
    HttpModule,
    BlogRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
