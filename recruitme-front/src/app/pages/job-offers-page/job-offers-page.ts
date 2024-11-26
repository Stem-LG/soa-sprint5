import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOffersService } from '../../services/job-offers';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from "../../components/app-bar/app-bar";
import { JobOfferCardComponent } from '../../components/job-offer-card/job-offer-card';

@Component({
  selector: 'job-offers-page',
  standalone: true,
  imports: [RouterLink, FormsModule, AppBarComponent, JobOfferCardComponent],
  providers: [JobOffersService],
  templateUrl: './job-offers-page.html',
})
export class JobOffersPage {

  jobOffersService = inject(JobOffersService)

  constructor() {
    this.jobOffersService.fetchJobOffers()
  }

  pages = computed(() => {
    const { totalPages } = this.jobOffersService.pageInfo()
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  })

  searchQueryValue: string = "";
  searchOptionValue: string = "title";

  onSearchClick() {

    if (this.searchQueryValue != "") {

      this.jobOffersService.searchConfig.set({
        option: this.searchOptionValue,
        query: this.searchQueryValue
      })

    } else {

      this.jobOffersService.searchConfig.set(null)

    }

    this.jobOffersService.fetchJobOffers()

  }

  goToPage(page: number) {
    this.jobOffersService.changePage(page - 1)
  }

  previousPage() {
    this.jobOffersService.changePage(this.jobOffersService.pageInfo().number - 1)
  }

  nextPage() {
    this.jobOffersService.changePage(this.jobOffersService.pageInfo().number + 1)
  }

}