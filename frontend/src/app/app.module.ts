import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { MenuComponent } from './components/menu/menu.component';

// Add to imports
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameCreatorComponent } from './components/game-creator/game-creator.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCommonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { SkillTreeComponent } from './components/champion-creator/component-templates/skill-tree/skill-tree.component';
import { AttributesComponent } from './components/champion-creator/component-templates/attributes/attributes.component';
import { ChampionCreatorComponent } from './components/champion-creator/champion-creator.component';
import { Attributes } from './common/entities/attributes';
import { ChampionDialogComponent } from './components/champion-list/dialogs/champion-dialog/champion-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetailsComponent } from './components/shared/details/details.component';
import { StatusBarComponent } from './components/game/components/status-bar/status-bar.component';
import { SkillListComponent } from './components/game/components/skill-list/skill-list.component';
import { DetailsPreviewComponent } from './components/shared/details-preview/details-preview.component';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { AffirmationComponent } from './components/game/dialogs/affirmation/affirmation.component';
// Add to imports
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'game-creator', component: GameCreatorComponent },
  { path: 'game-results', component: GameResultsComponent },
  { path: 'champion-list', component: ChampionListComponent },
  { path: 'champion-creator/:id', component: ChampionCreatorComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: '**', redirectTo: 'menu', pathMatch: 'full' },
];

export function attributesFactory(): Attributes {
  return new Attributes();
}

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameCreatorComponent,
    MenuComponent,
    ChampionCreatorComponent,
    ChampionListComponent,
    SkillTreeComponent,
    AttributesComponent,
    ChampionDialogComponent,
    DetailsComponent,
    StatusBarComponent,
    SkillListComponent,
    DetailsPreviewComponent,
    GameResultsComponent,
    AffirmationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    FormsModule,
    // MatCommonModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: Attributes, useFactory: attributesFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}
