import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { iframely } from '@iframely/embed.js';
const iframely = require('@iframely/embed.js')

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit {
  @Input()
  shopImageHtml = '';

  sanitizedHtml: SafeHtml = '';

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    iframely.load();
    this.sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.shopImageHtml
    );
  }
}
