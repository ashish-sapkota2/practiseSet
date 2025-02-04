import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddRecordComponent } from './component/add-record/add-record.component';
import { PieComponent } from './component/pie/pie.component';
import { BarComponent } from './component/bar/bar.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {
        path:'',
        children:[

            {path:'add-record',component:AddRecordComponent},
            { path: 'table', component: HomeComponent },
          { path: 'pie', component: PieComponent },
          { path: 'bar', component: BarComponent },
        ]
    },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
];
