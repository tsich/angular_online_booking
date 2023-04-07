import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, products } from "../products";
import { CartService } from "../cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  durationInSeconds = 5;

  // ActivatedRoute is specific to each component that the Angular Router loads.
  // ActivatedRoute contains information about the route and the route's parameters.
  // By injecting ActivatedRoute, you are configuring the component to use a service.
  // The Managing Data step covers services in more detail.
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get("productId"));

    // Find the product that corresponds with the id provided in route.
    this.product = products.find(
      (product) => product.id === productIdFromRoute
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert(`Your product: ${product.name} has been added to the cart!`);
    this.openSnackBar(product);
  }

  openSnackBar(product: Product) {
    this._snackBar.open(
      `Your product: ${product.name} has been added to the cart!`,
      "Dismiss",
      { duration: this.durationInSeconds * 1000 }
    );
  }
}
