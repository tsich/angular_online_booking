// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./products";

@Injectable({
  providedIn: "root",
})
export class FavouritesService {
  // Data structure for favourites list
  favs: Product[] = [];

  // constructor(private http: HttpClient) {}

  addToFavourites(product: Product) {
    if (this.favs.indexOf(product) === -1) {
      this.favs.push(product);
      window.alert(`Product: ${product.name} has been added to Favourites!`);
    } else {
      console.log("This item already exists");
    }
  }

  getFavourites() {
    return this.favs;
  }

  removeFavourite(id: number) {
    this.favs = this.favs.filter((obj) => obj.id !== id);
    return this.favs;
  }

  clearFavourites() {
    this.favs = [];
    return this.favs;
  }
}
