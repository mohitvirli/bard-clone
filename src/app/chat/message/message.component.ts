import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Message } from '../chat.model';
import { parseResponse } from '../chat.utils';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent {
  /**
   * The input message.
   */
  @Input() message!: Message;

  /**
   * Format the message to be shown in HTML in a pretty format.
   *
   * @param message The message string
   * @returns The formatted HTML string
   */
  parseResponse(message: string): string {
    const a = parseResponse(message);
    return a;
  }
}
