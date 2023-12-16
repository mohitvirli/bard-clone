import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionCardComponent {
  @Input() suggestion: any;

  constructor(private chatService: ChatService) {}

  onClick(topic: any) {
    this.chatService.sendMessage(topic.prompt);
  }
 }
