import { Component, inject, Input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth";
import { ChevronLeft, LucideAngularModule } from "lucide-angular";



@Component({
  selector: "app-bar",
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [AuthService],
  templateUrl: "./app-bar.html",
})
export class AppBarComponent {

  readonly ChevronLeft = ChevronLeft;

  @Input({ required: true }) title!: string;

  @Input() subtitle: string = "";

  @Input() backLink?: string;

  @Input() createButton?: { label: string, link: string };

  authService = inject(AuthService);
  router = inject(Router);


  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}