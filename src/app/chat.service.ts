import { Injectable } from '@angular/core';
import {Location} from '@angular/common';
import OpenAI from "openai";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const sampleResponse = {
  "id": "chatcmpl-8W32lnx3yo55xnwaVd7sltqlIawUR",
  "object": "chat.completion",
  "created": 1702648887,
  "model": "gpt-3.5-turbo-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 9,
    "total_tokens": 18
  },
  "system_fingerprint": null
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private openai = new OpenAI({
  //   apiKey: process.env['OPENAI_API_KEY'],
  //   dangerouslyAllowBrowser: true,
  // });

  messageMap: any = {};

  conversationList$: BehaviorSubject<any> = new BehaviorSubject([]);

  activeConversationId: string = '';

  messageList$: BehaviorSubject<any> = new BehaviorSubject([]);

  isLoading$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private location: Location, private router: Router) {}

  chat(content: string): Promise<any> {
    const api = new Promise(res => {
      setTimeout(() => {
        res(sampleResponse)
      }, 1000)
    })
    // const api2 = this.openai.chat.completions.create({
    //   messages: [{ role: "system", content }],
    //   model: "gpt-3.5-turbo",
    // })
    return api.then((res: any) => res.choices[0].message.content);
  }

  setCurrentConversation(conversationId: string) {
    if (!conversationId) {
      this.messageList$.next([]);
      this.activeConversationId = '';
      return;
    }

    if (this.activeConversationId === conversationId) {
      return;
    }

    if (!this.messageMap[conversationId]) {
      this.router.navigate([`/chat`]);
      return;
    }

    this.messageList$.next([...this.messageMap[conversationId]]);
    this.activeConversationId = conversationId;
  }

  sendMessage(message: string) {
    if (!this.messageList$.value.length) {
      const id = Date.now();
      // this.location.go();
      this.activeConversationId = `${id}`;
      this.router.navigate([`/chat/${id}`])
      this.conversationList$.next([...this.conversationList$.value, { message, id }]);
      this.messageMap[id] = [];
    }

    this.messageList$.next([...this.messageList$.value, {
      type: 'user',
      message,
    }, {
      type: 'bot',
      state: 'loading'
    }]);

    return this.chat(message)
      .then(response => {
        const messageList = [...this.messageList$.value];
        messageList.splice(messageList.length - 1, 1, {
          type: 'bot',
          state: 'success',
          message: response,
        });

        this.messageList$.next([...messageList]);
        this.messageMap[this.activeConversationId] = messageList;
      });
  }
}
