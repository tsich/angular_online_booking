import { Component } from "@angular/core";
import { FavouritesService } from "../favourites.service";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.css"],
})
export class FavouritesComponent {
  favs = this.favouritesService.getFavourites();

  constructor(private favouritesService: FavouritesService) {}

  onClear(): void {
    this.favs = this.favouritesService.clearFavourites();
  }

  onRemove(id: number): void {
    this.favs = this.favouritesService.removeFavourite(id);
  }
}
