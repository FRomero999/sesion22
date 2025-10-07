import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-main-page',
  imports: [Footer, Header],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {


}
