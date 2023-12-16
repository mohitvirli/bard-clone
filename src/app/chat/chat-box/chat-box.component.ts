import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    ReactiveFormsModule,
  ],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChatBoxComponent {
  formGroup = new FormGroup({
    textInput: new FormControl(''),
  })

  submitting = false;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

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
