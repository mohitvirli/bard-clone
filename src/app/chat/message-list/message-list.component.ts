import { animate, style, transition, trigger } from '@angular/animations';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ChatService } from '../chat.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    MatListModule,
    ScrollingModule,
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss',
  // Add Animations in entering the chat message.
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))]
      ),
    ])
  ]
})
export class MessageListComponent implements OnInit {
  /**
   * The reference to the virtual scroll bar.
   */
  @ViewChild("virtualScroll", { static: true }) virtualScrollViewport: CdkVirtualScrollViewport | undefined;

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    // On message list update, scroll to bottom.
    this.chatService.messageList$.subscribe(() => this.scrollToBottom());
  }

  /**
   * Scroll to bottom handy function.
   */
  scrollToBottom() {
    // Need to use settimeout due to some issues with Virtual Scroll.
    setTimeout(
      () => {
        (this.virtualScrollViewport as CdkVirtualScrollViewport).scrollTo({
          bottom: 0,
          behavior: 'auto'
        });
      },
      0
    );
  }
}
