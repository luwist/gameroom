import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"sala-juegos-vilchez-javier","appId":"1:302591967328:web:e46a167cdfd5cb08d30305","storageBucket":"sala-juegos-vilchez-javier.appspot.com","apiKey":"AIzaSyCjkmME1czV1gcyXaz9ssb-gLlp2275jiI","authDomain":"sala-juegos-vilchez-javier.firebaseapp.com","messagingSenderId":"302591967328"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
