import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessageListComponent } from './message-list/message-list.component';
import { NewChatComponent } from './new-chat/new-chat.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MessageListComponent,
    ScrollingModule,
    ChatBoxComponent,
    NewChatComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  constructor(public chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // On route params change set the active coversation
    this.route.params
      .subscribe(params => this.chatService.setCurrentConversation(params['id'] as string));
  }
}
