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

  @ViewChild("virtualScroll", { static: true }) virtualScrollViewport: CdkVirtualScrollViewport | undefined;

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messageList$.subscribe(() => this.scrollToBottom());
  }

  scrollToBottom() {
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
