import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-record',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.css'
})
export class AddRecordComponent {
  @ViewChild('userForm') userForm!:any;
  user = {
    ward:null,
    fullName: '',
    caste: '',
    sex: '',
    age: null,
    religion: '',
    occupation: '',
    education: '',
    disability: ''
  };
  nameHasNumbers = false;

  constructor(private userService: UserService, private router: Router){}

  submitForm(){
    if(this.userForm.valid){
      
      this.userService.addUser(this.user).subscribe(response=>{
        console.log("Record added successfully");
        alert("New data added");
        this.router.navigate(['/']);
      },
    error=>{
      alert("error while adding data");
    })
    }else{
      console.log("Form is invalid")
    }
  }
  validateName() {
    const regex = /\d/; // Regex to check for numbers
    this.nameHasNumbers = regex.test(this.user.fullName);
  }
}
