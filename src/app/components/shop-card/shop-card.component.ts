import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    this.sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.shopImageHtml
    );
  }
}
