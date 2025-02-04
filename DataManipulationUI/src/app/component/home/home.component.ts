import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  editingRowId:number;
  viewMode: string = 'table';
  searchCriteria: any = {
    ward:'',
    fullName: '',
    caste: '',
    sex: '',
    age: '',
    religion: '',
    education: '',
    occupation: '',
    disability: ''
  };
  constructor(private userService: UserService){
this.loadMember();
  }
  loadMember(){
    this.userService.getUsers().subscribe(response=>{
      this.users=response;
      this.filteredUsers=response;
      console.log(response)
    });
  }
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadMember();
      alert("user is deleted");
    })
  }
  editUser(userId: number){
    this.editingRowId=userId;
  }
  saveUser(user:User){
    this.userService.editUser(user).subscribe(()=>{
      this.editingRowId=null;
      alert("user updated successfully");
      this.loadMember();
    });
  }
  // openAddRecordForm(){
  //   console.log("open form model")
  // }
  // filterUsers(){
  //  this.userService.searchUsers(this.searchQuery).subscribe((data:User[])=>{
  //   this.filteredUsers=data.filter(user=>
  //     (this.ageFilter ? user.age === +this.ageFilter : true)
  //   )
  //  })
  // }
  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      return (
        (!this.searchCriteria.fullName || user.fullName.toLowerCase().includes(this.searchCriteria.fullName.toLowerCase())) &&
        (!this.searchCriteria.ward || user.ward.toString().includes(this.searchCriteria.ward.toString())) &&
        (!this.searchCriteria.caste || user.caste.toLowerCase().includes(this.searchCriteria.caste.toLowerCase())) &&
        (!this.searchCriteria.sex || user.sex.toLowerCase().includes(this.searchCriteria.sex.toLowerCase())) &&
        (!this.searchCriteria.age || user.age.toString().includes(this.searchCriteria.age.toString())) &&
        (!this.searchCriteria.religion || user.religion.toLowerCase().includes(this.searchCriteria.religion.toLowerCase())) &&
        (!this.searchCriteria.education || user.education.toLowerCase().includes(this.searchCriteria.education.toLowerCase())) &&
        (!this.searchCriteria.occupation || user.occupation.toLowerCase().includes(this.searchCriteria.occupation.toLowerCase())) &&
        (!this.searchCriteria.disability || user.disability.toLowerCase().includes(this.searchCriteria.disability.toLowerCase()))
      );
    });
  }
//   changeView(mode: string) {
//     this.viewMode = mode;
// }
}
