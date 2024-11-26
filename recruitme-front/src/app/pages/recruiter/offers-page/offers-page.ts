import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOffersService } from '../../../services/job-offers';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from "../../../components/app-bar/app-bar";
import { JobOfferCardComponent } from "../../../components/job-offer-card/job-offer-card";

@Component({
  selector: 'recruiter-offers-page',
  standalone: true,
  imports: [FormsModule, AppBarComponent, JobOfferCardComponent],
  providers: [JobOffersService],
  templateUrl: './offers-page.html',
})
export class RecruiterOffersPage {

  jobOffersService = inject(JobOffersService)

  pages = computed(() => {
    const { totalPages } = this.jobOffersService.pageInfo()
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  })

  searchQueryValue: string = "";
  searchOptionValue: string = "title";

  constructor() {
    this.jobOffersService.fetchJobOffers(true)
  }

  onSearchClick() {

    if (this.searchQueryValue != "") {

      this.jobOffersService.searchConfig.set({
        option: this.searchOptionValue,
        query: this.searchQueryValue
      })

    } else {

      this.jobOffersService.searchConfig.set(null)

    }

    this.jobOffersService.fetchJobOffers(true)
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
