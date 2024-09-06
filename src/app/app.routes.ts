import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { tokenExpiryGuard } from './services/token-expiry.guard';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [      
    {
        path:'',
        redirectTo:'home',
        pathMatch:"full"                
    },
    {
        path:'home',
        component:HomeComponent,
        canActivate: [tokenExpiryGuard]
    },       
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent,
        canActivate: [tokenExpiryGuard],
        
    },
    {
        path:"show/users",        
        component: UsersComponent,
        canActivate: [tokenExpiryGuard]
        
    },
    {
        path:"**",
        component: NotFoundComponent
    }


];
