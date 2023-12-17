import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import OpenAI from "openai";
import { BehaviorSubject } from 'rxjs';
import { Message } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /**
   * Initialize Chat GPT client with user's API key.
   */
  private openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
    dangerouslyAllowBrowser: true,
  });

  /**
   * The messages caches. Since there's no API that returns all the
   * conversations per topic (I wasn't able to find documentation)
   * This is a map from random id to the list of messages in that converation.
   */
  messageCache: Map<string, Message[]> = new Map();

  /**
   * The current set of messages to be displayed on the screen.
   */
  messageList$: BehaviorSubject<Message[]> = new BehaviorSubject([] as Message[]);

  /**
   * The conversations list. Basically a list of topics discussed on every new
   * chat.
   */
  conversationList$: BehaviorSubject<any> = new BehaviorSubject([]);

  /**
   * Currently active conversation's id.
   */
  activeConversationId: string = '';

  /**
   * Currently selected topic (from the new chat screen).
   */
  selectedTopic$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  /**
   * This makes the API request to OpenAI's chat gpt
   *
   * @param content The message to be sent
   * @returns A promise with the response message from ChatGPT
   */
  chat(content: string): Promise<string> {
    return this.openai.chat.completions.create({
      messages: [{ role: "system", content }],
      model: "gpt-3.5-turbo",
    }).then(res => res.choices[0].message.content ?? '');
  }

  /**
   * Sets the current conversation. If the user tries to navigate between
   * conversations, the older messages would be displayed using the map.
   *
   * @param conversationId The current conversation id.
   */
  setCurrentConversation(conversationId: string) {
    // If no conversation id is present, then reset all the messages.
    if (!conversationId) {
      this.messageList$.next([]);
      this.activeConversationId = '';
      return;
    }

    // If the current conversation id is what is being set, we don't need to
    // update the messages. Return early.
    if (this.activeConversationId === conversationId) {
      return;
    }

    // If the message cache doesn't have the covnersation id. ie invalid id,
    // redirect to home page (new chat).
    if (!this.messageCache.get(conversationId)) {
      this.router.navigate([`/chat`]);
      return;
    }

    // If we have the messages from the chat with the respective conversation id
    // update the message list and the active id.
    this.messageList$.next([...(this.messageCache.get(conversationId) ?? [])]);
    this.activeConversationId = conversationId;
  }

  /**
   * Sends the message alongwith setting other neccessary details.
   *
   * @param message The message to be sent.
   * @returns A promise with all the messages.
   */
  sendMessage(message: string): Promise<Message[]> {

    // If this is the first time we are sending a message. Update the message
    // cache
    if (!this.messageList$.value.length) {
      // Generate a unique id.
      this.activeConversationId = `${Date.now()}`;
      // Silently navigate to the new conversations page.
      this.router.navigate([`/chat/${this.activeConversationId}`])

      // Update the list of conversations using the first message as the title
      this.conversationList$.next([...this.conversationList$.value, { message, id: this.activeConversationId }]);

      // Update the cache.
      this.messageCache.set(this.activeConversationId, []);
    }

    // Udpate the message  and the cache. The bot message is in loading state
    // to show the loader.
    const userMessage: Message = { type: 'user', message };
    const botMessage: Message = { type: 'bot', isLoading: true, message: '' };
    const messageList = [...this.messageList$.value, userMessage, botMessage];
    this.messageList$.next(messageList);
    this.messageCache.set(this.activeConversationId, messageList);

    return this.chat(message)
      .then(response => {
        // After a successful response, update the last message (the bot's)
        // with loading flag set to false and the message being set.
        const messageList = [...this.messageList$.value];
        messageList.splice(messageList.length - 1, 1, {
          type: 'bot',
          isLoading: false,
          message: response,
        });

        // Update the message list and the message cache.
        this.messageList$.next([...messageList]);
        this.messageCache.set(this.activeConversationId, messageList);
        return messageList;
      })
      .catch(err => {
        // Show the error in the snackbar.
        const message = err?.message ?? 'Oops! Some Error occured';
        this.snackbar.open(message, 'Dismiss', {
          horizontalPosition: 'start'
        })
        return [];
      });
  }

  setPrompt(message: string) {

  }
}
