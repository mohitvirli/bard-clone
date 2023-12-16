import { animate, style, transition, trigger } from '@angular/animations';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { delay, distinctUntilChanged, filter, tap } from 'rxjs';
import { BlankCardComponent } from '../blank-card/blank-card.component';
import { ChatService } from '../../chat.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    MessageComponent,
    MatListModule,
    ScrollingModule,
    BlankCardComponent,
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
