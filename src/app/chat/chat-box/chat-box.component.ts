import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

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
  /**
   * The form group to handle the value changes on input change.
   */
  formGroup = new FormGroup<{ textInput: FormControl}>({
    textInput: new FormControl<string>(''),
  })

  /**
   * If the Form is submitting.
   */
  submitting = false;

  constructor(private chatService: ChatService) {}

  /**
   * On submitting the prompt
   * @param event Optionallly called by the Keybaord event on Enter.
   */
  onSubmit(event?: KeyboardEvent) {
    // If enter key is pressed then also submit the prompt.
    event?.preventDefault();

    const value = this.formGroup.controls.textInput.value.trim();

    // Only submit if the form is not being submitted already or the value is
    // present.
    if (!this.submitting && value) {
      this.submitting = true;

      this.chatService.sendMessage(value.trim())
        .finally(() => this.submitting = false);

      // reset the value.
      this.formGroup.controls.textInput.setValue('');
    }
  }
 }
