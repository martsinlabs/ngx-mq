import { between, down, matchMediaSignal, MQ_BREAKPOINTS, up } from 'ngx-mq';
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
  isSmallAndUp: Signal<boolean> = up('sm');

  isBelowMedium: Signal<boolean> = down('md');

  isBetweenSmallAndLarge: Signal<boolean> = between('sm', 'lg');

  canHover: Signal<boolean> = matchMediaSignal('(hover: hover)');

  constructor(@Inject(MQ_BREAKPOINTS) public breakpoints: MqBreakpoints) {}
}
