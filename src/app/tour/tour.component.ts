import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Tour} from "../model/Tour";
import {ServiceService} from "../service/tour.service";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  formTour!: FormGroup;
  tours: Tour[] = [];
  tour?: Tour;

  constructor(private tourService: ServiceService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formTour = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllTour();
  }

  get id() {
    return this.formTour?.get('id');
  }

  get title() {
    return this.formTour?.get('title');
  }

  get price() {
    return this.formTour?.get('price');
  }

  get description() {
    return this.formTour?.get('description');
  }

  getAllTour() {
    this.tourService.getAllTour().subscribe( data =>
      this.tours = data);
    this.formTour?.reset();
    // @ts-ignore
    document.getElementById("form-create").hidden = false;
    // @ts-ignore
    document.getElementById("form-update").hidden = true;
  }

  getBook(id: any) {
    this.tourService.getTourById(id).subscribe((data) => {
      this.tours = [];
      this.tours.push(data);
    });
  }

  createTour() {
    const tour = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      price: this.formTour?.value.price,
      description: this.formTour?.value.description
    };
    this.tourService.createTour(tour).subscribe(() => {
      alert('Create Tour Successfully');
      this.formTour?.reset();
      this.getAllTour();
    });
  }

  editTour(id: any) {
    this.tourService.getTourById(id).subscribe(data => this.formTour?.patchValue(data));
    // @ts-ignore
    document.getElementById("form-update").hidden = false;
    // @ts-ignore
    document.getElementById("form-create").hidden = true;
  }

  updateTour() {
    const tour = {
      id: this.formTour?.value.id,
      title: this.formTour?.value.title,
      price: this.formTour?.value.price,
      description: this.formTour?.value.description
    };
    console.log(this.tour)
    this.tourService.updateTour(tour.id, tour).subscribe((data) => {
      console.log('aaaaaa ===>', data)
      alert('Update Tour Successfully');
      this.formTour?.reset();
      this.getAllTour();
      // @ts-ignore
      document.getElementById("form-update").hidden = true;
    });
  }

  deleteTour(id: any, title: any) {
    if (confirm('Are you sure you want to delete tour: ' + title + ' ?')) {
      this.tourService.deleteTour(id).subscribe(() => {
        alert('Delete Successfully');
        this.getAllTour();
      });
    }
  }


}
