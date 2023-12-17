import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
export class NewChatComponent implements OnDestroy {
  /**
   * List of suggestion cards. With title and relative prompt.
   *
   * TODO: This can be fetched from an API maybe.
   */
  suggestionList: Suggestion[] = mockSuggestionList;

  constructor(public chatService: ChatService) {}

  /**
   * When the component is destroyed. set the value of selected topic as empty
   */
  ngOnDestroy(): void {
    this.chatService.selectedTopic$.next('');
  }
 }
