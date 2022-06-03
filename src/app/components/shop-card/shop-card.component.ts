import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ShopInfo } from 'src/app/interface/shop-info';
import { InstagramDOMService } from 'src/app/service/instagram-dom.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent implements OnInit, AfterViewInit {
  @Input()
  shop!: ShopInfo;

  @Input()
  isDisplayImage = true;

  sanitizedHtml: SafeHtml = '';

  constructor(
    private domSanitizer: DomSanitizer,
    private instagram: InstagramDOMService
  ) {}

  ngOnInit(): void {
    this.sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.shop?.shopImageHtml
    );
  }

  ngAfterViewInit(): void {
    this.instagram.processEmbeddedInstagramPosts();
  }
}
