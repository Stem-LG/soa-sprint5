import { Component, signal, computed, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppBarComponent } from "../../../components/app-bar/app-bar";
import { UsersService } from "../../../services/admin/users";

@Component({
  selector: "users-page",
  standalone: true,
  templateUrl: "./users-page.html",
  providers: [UsersService],
  imports: [AppBarComponent, CommonModule, FormsModule],
})
export class UsersPage {

  usersService = inject(UsersService);

  filter = signal<string>('all');

  selectedUser = signal<User | null>(null);

  openUserDialog(user: User) {
    this.selectedUser.set(user);

    //@ts-ignore  
    users_modal.showModal();
  }

  filteredUsers = computed(() => {
    return this.usersService.users().filter(user => {
      return this.filter() === 'all' || user.role.toLowerCase() === this.filter();
    });
  });

  onFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filter.set(select.value);
  }

}