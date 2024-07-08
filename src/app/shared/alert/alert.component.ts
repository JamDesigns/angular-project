import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PlaceholderDirective } from '../placeholder/placeholder.directive';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  @ViewChild(PlaceholderDirective, { static: true })
  alertHost!: PlaceholderDirective;

  onClose() {
    this.close.emit();
  }
}
