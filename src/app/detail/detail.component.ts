import { Component, OnInit } from '@angular/core';
import { CustomerService } from "app/service/customer.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Customer } from "app/model/customer.model";
import { Address } from "app/model/address.model";
import { CustomerImage } from "app/model/customer.image.model";
import { Location } from '@angular/common';

@Component( {
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
} )
export class DetailComponent implements OnInit {
    customer: Customer = new Customer();
    errorMessage: string;

    constructor( private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private location: Location ) { }

    ngOnInit(): void {
        //need to initialize values
        this.resetValues();
        this.route.params.subscribe(( params: Params ) => {
            console.log( '----------> Param value : ' + params['id'] );
            let idValue = params['id'];
            this.customerService.getCustomerDetails( idValue ).
                subscribe( data => {
                    this.customer = data;
                    console.log("----------> returned service data: " + this.customer.id);
                    console.log("----------> returned service data: " + this.customer.firstName);
                } );
            // this will be called every time route changes
            // so you can perform your functionality here

        } );
    }

    onUpdate(){
        console.log(this.customer);
        this.customerService.updateCustomer(this.customer).
        subscribe(
            data => {
                //navigate back to list page
                console.log( "----------> update customer id: " + data );
                this.router.navigate(['/list']);
            },
            error => {
                console.log( "----------> error details: " + error );
                this.errorMessage = error;
         });
        
    }
    
    onBack() : void{
        this.location.back();
    }
    
    resetValues() : void{
        this.customer = new Customer();
        //had to do this for instantiating address pojo as well as it was complaining about having null address object
        this.customer.address = new Address();
        this.customer.address.county = "Howard";
        this.customer.address.town = "Columbia";
        this.customer.address.postcode = "21044";
        
        //create new customerImage, replace with actual implementation after file upload
        this.customer.customerImage = new CustomerImage();
        this.customer.customerImage.key = "filename_key";
        this.customer.customerImage.url = "filename_url";
    }
}
