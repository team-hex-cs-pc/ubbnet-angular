import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ChatMessage } from '../models/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') messageInput!: ElementRef;
  messages: ChatMessage[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.receiveMessage();
  }

  async sendMessage(message: string) {
    await this.userService.sendMessage(message);
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.value = '';
    }
  }

  receiveMessage(): void {
    this.userService.receiveMessage((chatMessage: ChatMessage) => {
      this.messages = [...this.messages, chatMessage];
    });
  }
}
