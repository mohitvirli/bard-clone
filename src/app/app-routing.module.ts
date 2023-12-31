import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

/**
 * The routes for the app
 * /chat - new chat
 * /chat/{id} - previous chat
 */
const routes: Routes = [
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  {
    path: 'chat',
    children: [
      {
        path: '',
        component: ChatComponent,
      },
      {
        path: ':id',
        component: ChatComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
