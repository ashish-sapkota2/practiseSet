import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from "./component/nav/nav.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarComponent } from './component/bar/bar.component';
import { PieComponent } from './component/pie/pie.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  viewMode: string = 'table';
  title = 'DataManipulationUI';

  constructor(private router:Router){}

  changeView(mode: string) {
    this.viewMode = mode;
    if(this.viewMode=='bar'){
      this.router.navigate(['/bar']);
    }else if(this.viewMode=='pie'){
      this.router.navigate(['/pie']);
    }else{
      this.router.navigate(['/table']);
    }
}
}
