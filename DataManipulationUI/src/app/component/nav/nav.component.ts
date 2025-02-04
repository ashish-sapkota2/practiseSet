import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddRecordComponent } from '../add-record/add-record.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule,CommonModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
