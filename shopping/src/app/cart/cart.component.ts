import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CartService } from "../cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  value = "";
  items = this.cartService.getItems();

  // use the FormBuilder group() method to set the checkoutForm property
  // to a form model containing name and address fields.
  checkoutFormName = this.formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  checkoutFormLastName = this.formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  checkoutFormAddress = this.formBuilder.group({
    thirdCtrl: ["", Validators.required],
  });
  isLinear = true;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    this.items = this.cartService.clearCart();
    console.log(
      "Your order has been submitted",
      this.checkoutFormName.value,
      this.checkoutFormLastName.value,
      this.checkoutFormAddress.value
    );
  }
}
