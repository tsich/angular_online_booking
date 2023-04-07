import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../products";

@Component({
  selector: "app-product-alerts",
  templateUrl: "./product-alerts.component.html",
  styleUrls: ["./product-alerts.component.css"],
})
export class ProductAlertsComponent {
  // Define a property named product with an @Input() decorator.
  // The @Input() decorator indicates that the property value passes
  // in from the component's parent, ProductListComponent
  @Input() product!: Product | undefined;
  @Output() notify = new EventEmitter();
}
