import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modelos/user.model';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Mis Recetas', url: 'home', icon: 'pizza-outline' },
    { title: 'Perfil', url: 'profile', icon: 'person-outline' },
    { title: 'Categorias de comida', url: 'recetas', icon: 'fast-food-outline' },
    { title: 'Calendario de comidas', url: 'calendar', icon: 'calendar-outline' }
  ]

  router = inject(Router);

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    }) 
  }


  user() : User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  // =======Cerrar Sesion=========

  signOut() {
    this.firebaseSvc.signOut();
  }
}
