import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from './interfaces/product.interface';
import { PixabayService } from './services/pixabay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Array of products
  products: Product[] = [];
  // Search control
  searchControl = new FormGroup({
    parameter: new FormControl('', Validators.required),
  });
  // List of categories
  categories: any[] = [
    {
      category: 'science',
    },
    {
      category: 'education',
    },
    {
      category: 'people',
    },
    {
      category: 'feelings',
    },
    {
      category: 'computer',
    },
    {
      category: 'buildings',
    },
  ];
  // Model to show selected product in modal
  productModel: Product = {};

  constructor(private pixService: PixabayService) {}

  /**
   * Get the information about the available products from the REST API
   *
   * @memberof AppComponent
   */
  getProducts() {
    this.pixService.getProducts().subscribe(
      async (p: Product[]) => {
        if (p.length) {
          this.products = await p;
        } else {
          p = [];
        }
      },
      (err) => {
        console.log(err);
        this.products = [];
      }
    );
  }

  /**
   * Search images (products) by tags written in search control
   *
   * @memberof AppComponent
   */
  submit() {
    if (this.searchControl.valid) {
      this.pixService
        .getProductByParameter(this.searchControl.value.parameter)
        .subscribe(
          async (p: Product[]) => {
            if (p.length) {
              this.products = await p;
              this.searchControl.reset();
            } else {
              p = [];
            }
          },
          (err) => {
            console.log(err);
            this.products = [];
          }
        );
    }
  }

  /**
   * Search products by category when user clicks on it (category)
   *
   * @param {string} category
   * @memberof AppComponent
   */
  getProductsByCategory(category: string) {
    this.pixService.getProductByCategory(category).subscribe(
      async (p: Product[]) => {
        if (p.length) {
          this.products = await p;
          this.searchControl.reset();
        } else {
          p = [];
        }
      },
      (err) => {
        console.log(err);
        this.products = [];
      }
    );
  }

  /**
   * Set the model with the information of the selected product to show it in the modal
   *
   * @param {Product} p
   * @memberof AppComponent
   */
  showDetails(p: Product){
    this.productModel = p;
  }

  /**
   * Clear the information in the model
   *
   * @memberof AppComponent
   */
  resetModel(){
    this.productModel = {};
  }
}
