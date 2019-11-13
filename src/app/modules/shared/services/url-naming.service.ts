import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlNamingService {

  constructor(public router: Router) { }

  // Return current url name
  getRouteName():string{

   let route = decodeURI(this.router.url);
   if (route.indexOf('/label/')!=-1){
     return route.replace('/label/', '');
   }
   else{
     route = route.replace('/', '');

     switch(route) {
        case 'notes':
          return 'Keeper'
          break;
        case 'alarms':
          return 'Оповещения'
          break;
        case 'arhive':
          return 'Архив'
          break;
        case 'trash':
          return 'Корзина'
          break;
        default:
          return 'Keeper'
          break;
      }
   }

  }
}
