import { Component, inject, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FileService } from "../../services/file";
import { ImageOff, LucideAngularModule } from "lucide-angular";



@Component({
  selector: "job-offer-card",
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  providers: [FileService],
  templateUrl: "./job-offer-card.html",
})
export class JobOfferCardComponent {

  @Input({ required: true }) offer!: jobOffer;

  readonly imageOff = ImageOff;

  fileService = inject(FileService);

}