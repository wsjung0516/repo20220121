import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@repo20220121/api-interfaces';

@Component({
  selector: 'repo20220121-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
