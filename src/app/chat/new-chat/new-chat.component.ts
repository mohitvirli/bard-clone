import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mockSuggestionList } from '../chat.data';
import { Suggestion } from '../chat.model';
import { ChatService } from '../chat.service';
import { SuggestionCardComponent } from '../suggestion-card/suggestion-card.component';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [
    CommonModule,
    SuggestionCardComponent,
  ],
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChatComponent {
  /**
   * List of suggestion cards. With title and relative prompt.
   *
   * TODO: This can be fetched from an API maybe.
   */
  suggestionList: Suggestion[] = mockSuggestionList;
  
  constructor(public chatService: ChatService) {}
 }
