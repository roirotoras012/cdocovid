import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabPage,
    children: [
      {
        path: 'home2',
        children:[
          {
              path: '',
              loadChildren: () => import('../home2/home2.module').then(m => m.Home2PageModule)
          }
        ]
      },
      {
        path: 'cases',
        children:[
          {
              path: '',
              loadChildren: () => import('../covid/covid.module').then(m => m.CovidPageModule)
          }
        ]
      },
      {
        path: 'ayuda',
        children:[
          {
              path: '',
              loadChildren: () => import('../ayuda/ayuda.module').then(m => m.AyudaPageModule)
          }
        ]
      },
      {

        path: '',
        redirectTo: 'tabs/home2',
        pathMatch: 'full'

      }
    ]

  },
  {

    path: '',
    redirectTo: 'tabs/home2',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
