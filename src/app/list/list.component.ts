import { Component, OnInit } from '@angular/core';
import { CustomerService } from "app/service/customer.service";
import { Customer } from "app/model/customer.model";
import { Router } from "@angular/router";

@Component( {
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
} )
export class ListComponent implements OnInit {
    customerList: Customer[];

    constructor( private custService: CustomerService, private router: Router ) { }

    ngOnInit() {
        this.loadAllCustomers();
    }

    loadAllCustomers(){
        this.custService.getAllCustomer().subscribe(( data ) => {
            this.customerList = data;
        } );;
    }
    
    onCustomerClick( customerId: string ): void {
        this.router.navigate( ['/detail', customerId] );
    }

    onDeleteClick( customerId: number ): void {
        this.custService.deleteCustomer( customerId )
        .subscribe(
            data => {
                //navigate back to list page
                console.log( "----------> deleted customer with id: " + data );
                this.loadAllCustomers();
            },
            error => {
                console.log( "----------> error details: " + error );
            });
    }
}
