import { Component, OnInit } from '@angular/core';
import { Customer } from "app/model/customer.model";
import { Address } from "app/model/address.model";
import { CustomerService } from "app/service/customer.service";
import { Router } from "@angular/router";
import { CustomerImage } from "app/model/customer.image.model";

@Component( {
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
} )
export class CreateComponent implements OnInit {
    customer: Customer;
    file: File;
    //address: Address;
    createdCustomerId: string;
    errorMessage: string;

    constructor( private router: Router, private customerService: CustomerService ) { }

    ngOnInit(): void {
        //need to initialize values
        this.resetValues();
    }

    onFileChange(event): void {
        let fileList: FileList = event.target.files;
        if ( fileList.length > 0 ) {            
            this.file = fileList[0];
            console.log( "----------> onFileChange() method invoked with a file : " + this.file.name );
        }
    }

    onSubmit() {
        console.log( this.customer );

        var formData = new FormData();
        formData.append('customer', new Blob([JSON.stringify(this.customer)],
                {
                    type: "application/json"
                }));
        formData.append( 'imageFile', this.file, this.file.name);

        this.customerService.createCustomer( formData ).
            subscribe(
            data => {
                //navigate back to list page
                console.log( "----------> create customer id: " + data );
                this.router.navigate( ['/list'] );
            },
            error => {
                console.log( "----------> error details: " + error );
                this.errorMessage = error;
            } );

    }

    resetValues(): void {
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
