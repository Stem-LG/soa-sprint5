import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ArrowUp, LucideAngularModule, Plus, X } from 'lucide-angular';
import { RecruiterJobOfferService } from '../../../services/recruiter/job-offer';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppBarComponent } from "../../../components/app-bar/app-bar";
import { FileService } from '../../../services/file';

@Component({
  selector: 'recruiter-create-offer-page',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, AppBarComponent],
  providers: [RecruiterJobOfferService, FileService],
  templateUrl: './recruiter-create-offer-page.html',
})
export class RecruiterCreateOfferPage {

  recruiterJobOfferService = inject(RecruiterJobOfferService);

  fileService = inject(FileService);

  router = inject(Router)

  readonly PlusIcon = Plus;
  readonly XIcon = X;
  readonly ArrowUpIcon = ArrowUp

  newOfferForm = new FormGroup({
    title: new FormControl(''),
    company: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
  });


  pictures: {
    id: number
  }[] = [];

  async submitOffer() {

    this.recruiterJobOfferService.createJobOffer({
      title: this.newOfferForm.get('title')?.value!,
      company: this.newOfferForm.get('company')?.value!,
      skills: this.newOfferForm.get('skills')?.value!,
      description: this.newOfferForm.get('description')?.value!,
      images: this.pictures.map(picture => (this.fileService.apiUrl + "/" + picture.id))
    }).then(() => {
      this.router.navigate(['/recruiter/offers']);
    });

  }

  addPictures() {

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = async () => {
      const files = Array.from(input.files!);
      const DBFiles = await Promise.all(files.map(file => this.fileService.uploadFile(file)));
      this.pictures = [...this.pictures, ...DBFiles];
    }
    input.click();

  }

  removePicture(index: number) {
    this.pictures = this.pictures.filter((_, i) => i !== index);
  }

  movePicture(index: number, direction: 'up' | 'down') {

    if (index === 0 && direction === 'up') return;
    if (index === this.pictures.length - 1 && direction === 'down') return;

    this.pictures = this.pictures.map((picture, i) => {
      if (i === index) {
        return this.pictures[direction === 'up' ? index - 1 : index + 1];
      }
      if (i === (direction === 'up' ? index - 1 : index + 1)) {
        return this.pictures[index];
      }
      return picture;
    })
  }

}
