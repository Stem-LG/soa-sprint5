import { inject, Injectable, signal } from "@angular/core";
import { AuthService } from "./auth";




@Injectable()
export class JobOffersService {

  authService = inject(AuthService)

  apiUrl = "http://localhost:4000/offers";

  jobOffers: jobOffer[] = []

  pageInfo = signal<
    {
      number: number,
      size: number,
      totalElements: number,
      totalPages: number
    }
  >(
    {
      number: 0,
      size: 9,
      totalElements: 0,
      totalPages: 0
    }
  )

  sortConfig = signal<
    {
      column: string,
      direction: string
    }
  >({
    column: "id",
    direction: "asc"
  })

  searchConfig = signal<
    {
      option: string,
      query: string,
    } | null
  >(null)

  async fetchJobOffers(recruiterMode: boolean = false) {

    let requestUrl = this.apiUrl;

    const searchConfig = this.searchConfig();

    const user = this.authService.user();

    const sortingParams = `page=${this.pageInfo().number}&size=${this.pageInfo().size}&sort=${this.sortConfig().column},${this.sortConfig().direction}`

    if (searchConfig != null) {
      const { option, query } = searchConfig;
      if (recruiterMode && user) {
        requestUrl += `/search/byRecruiterAnd${option.charAt(0).toUpperCase() + option.slice(1)}?recruiterId=${user.id}&${option}=${query}&${sortingParams}`;
      } else {
        requestUrl += `/search/by${option.charAt(0).toUpperCase() + option.slice(1)}?${option}=${query}&${sortingParams}`;
      }
    } else {
      if (recruiterMode && user) {
        requestUrl += `/search/byRecruiter?recruiterId=${user.id}&${sortingParams}`;
      } else {
        requestUrl += `?${sortingParams}`;
      }
    }

    const result = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const response = await result.json()

    this.jobOffers = response._embedded.jobOffers.map((offer: jobOffer) => (
      {
        ...offer,
        createdAt: new Date(offer.createdAt)
      }
    ))

    this.pageInfo.set({ ...response.page, disabled: false })

  }

  sortResults(column: string) {

    if (column == this.sortConfig().column) {
      this.sortConfig.update((prev) => ({
        ...prev,
        direction: this.sortConfig().direction == "desc" ? "asc" : "desc"
      }))
    } else {
      this.sortConfig.set({
        column,
        direction: "asc"
      })
    }

    this.fetchJobOffers()
  }

  changePage(page: number) {
    this.pageInfo.set({ ...this.pageInfo(), number: page })
    this.fetchJobOffers()
  }


}