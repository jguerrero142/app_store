import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { WebsocketService } from './shared/services/websocket.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  id: number;
  role: number;
  user$: any = [];
  user: any = [];

  

  constructor( public auth: AuthService,
               public wsService: WebsocketService ) {
                this.sendMessage();
               }

               sendMessage(){
                const payload = {
                  de: 'Julian',
                  cuerpo: 'juli'
                };
            
                this.wsService.emit('mensaje',payload);
              }

  

    ngOnInit(){
      this.auth.localAuthSetup();
    }

}
  

