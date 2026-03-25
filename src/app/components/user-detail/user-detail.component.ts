import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html', // Trigger IDE refresh
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user:any;
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
    if (userId) {
      this.fetchUserDetails(userId);
    } else {
      
      this.error = 'Invalid user ID';
      this.isLoading = false;
    }
  }

  fetchUserDetails(id: string) {
    this.isLoading = true;
    this.error = null;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
                // console.log(this.error);
        this.isLoading = false;
      }
    });
  }
}
