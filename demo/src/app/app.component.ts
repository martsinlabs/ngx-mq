import { between, down, matchMediaSignal, MQ_BREAKPOINTS, orientation, up } from 'ngx-mq';
import { Component, Inject, Signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MqBreakpoints } from 'ngx-mq';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isMobile: Signal<boolean> = down('md');

  isTablet: Signal<boolean> = between('md', 'lg');

  isDesktop: Signal<boolean> = up('lg');

  isLandscape: Signal<boolean> = orientation('landscape');

  canHover: Signal<boolean> = matchMediaSignal('(hover: hover)');

  constructor(@Inject(MQ_BREAKPOINTS) public breakpoints: MqBreakpoints) {}
}
