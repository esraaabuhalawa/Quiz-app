import { Component, input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Avatar } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { DeleteConfig } from '../interfaces/delete';

@Component({
  selector: 'app-delete',
  imports: [Dialog, Avatar, CommonModule],
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
})
export class Delete {
  visible = input.required<boolean>();
  config = input.required<DeleteConfig>();
  visibleChange = output<boolean>();
  confirmed = output<void>();
  cancelled = output<void>();

  onConfirm(): void {
    this.confirmed.emit();
    this.close();
  }

  onCancel(): void {
    this.cancelled.emit();
    this.close();
  }

  private close(): void {
    this.visibleChange.emit(false);
  }
}
