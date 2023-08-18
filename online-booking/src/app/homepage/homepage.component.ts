import { HostListener, Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', '../../assets/css/carousel.css'],
})
export class HomepageComponent {
  // When the user scrolls down 20px from the top of the document, show the button
  @HostListener('window:scroll', ['$event'])
  scrollFunction() {
    //Get the button
    const mybutton: any = document.getElementById('btn-back-to-top');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }

  backToTop() {
    console.log('clicked BACK TO TOP BTN');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
