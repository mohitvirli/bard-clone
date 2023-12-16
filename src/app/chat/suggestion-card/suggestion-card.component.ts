import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Suggestion, SuggestionTopic } from '../chat.model';
import { ChatService } from '../chat.service';

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
  /**
   * Pass the suggestion to the component.
   */
  @Input() suggestion?: Suggestion;

  constructor(private chatService: ChatService) {}

  /**
   * On clicking a topic, send the prompt to start the conversation.
   * 
   * @param topic The topic
   */
  onClick(topic: SuggestionTopic) {
    this.chatService.sendMessage(topic.prompt);
  }
 }
