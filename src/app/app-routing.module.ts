import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from "app/list/list.component";
import { DetailComponent } from "app/detail/detail.component";
import { CreateComponent } from "app/create/create.component";

const routes : Routes = [
    {   path: '', redirectTo: '/list', pathMatch: 'full'    },
    {   path: 'list', component: ListComponent  },
    {   path: 'detail/:id', component: DetailComponent  },
    {   path: 'create', component: CreateComponent  },
];

@NgModule( {
    imports: [RouterModule.forRoot( routes )],
    exports: [RouterModule]
} )

export class AppRoutingModule {}