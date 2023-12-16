import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ChatService } from '../chat.service';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageComponent } from '../message-list/message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MessageListComponent,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent implements OnInit {

  formGroup = new FormGroup({
    textInput: new FormControl(''),
  })

  submitting = false;
  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.chatService.setCurrentConversation(params['id'] as string);
      }
  );
  }


  onSubmit(event?: any) {
    event?.preventDefault();
    const value = this.formGroup.controls.textInput.value as string;
    if (!this.submitting && value) {
      this.submitting = true;
      this.chatService.sendMessage(value.trim())
        .finally(() => this.submitting = false);

      this.formGroup.controls.textInput.setValue('');
    }
  }
}
