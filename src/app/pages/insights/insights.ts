import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { INSIGHTS } from '../../data/site-content';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './insights.html',
  styleUrl: './insights.css',
})
export class Insights {
  insights = INSIGHTS;
}
