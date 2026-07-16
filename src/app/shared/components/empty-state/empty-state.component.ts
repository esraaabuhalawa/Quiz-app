import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export interface EmptyStateAction {
  label: string;
  icon?: string; // PrimeIcons class, e.g. 'pi pi-plus'
  handler: () => void;
}

@Component({
  selector: 'app-empty-state',
  imports: [ButtonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
    /** Heading — say what's missing, plainly. */
  @Input() elementName = 'This filter';

}
