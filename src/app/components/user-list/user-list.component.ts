import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = true;
  error: any;
  
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.fetchUsers();
    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm:any) => {
      this.filterUsers(searchTerm);
    });
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }

  filterUsers(term: string): void {
    const lowerTerm = term.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(lowerTerm) || 
      user.email.toLowerCase().includes(lowerTerm)
    );
  }
}
