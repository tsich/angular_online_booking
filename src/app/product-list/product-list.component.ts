import { Component } from "@angular/core";
import { Product, products } from "../products";
import { FavouritesService } from "../favourites.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  products = products;
  favItems = this.favouritesService.getFavourites();

  constructor(private favouritesService: FavouritesService) {}
  share() {
    window.alert("The product has been shared!");
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale!");
  }

  onAddToFavourites(product: Product) {
    this.favouritesService.addToFavourites(product);
  }
}