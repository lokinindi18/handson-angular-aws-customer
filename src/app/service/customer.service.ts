import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Customer } from "app/model/customer.model";
import { Http, Headers, RequestOptions } from "@angular/http";
import { environment } from "environments/environment";

//observables import
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const CUSTOMER_LIST: Customer[] = [
    { id: 1, firstName: 'Bhushan', lastName: 'Choube', dateOfBirth: '1981-01-10', address: { id: 11, street: 'Baltimore Way', town: 'Baltimore', county: 'Baltimore', postcode: '21041' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 2, firstName: 'Rohit', lastName: 'Sharma', dateOfBirth: '1981-11-21', address: { id: 12, street: 'Columbia Way', town: 'Columbia', county: 'Howard', postcode: '21042' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 3, firstName: 'Virat', lastName: 'Kohli', dateOfBirth: '1981-12-25', address: { id: 13, street: 'Rockville Way', town: 'Rockville', county: 'Montogomery', postcode: '21043' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 4, firstName: 'Parthiv', lastName: 'Patel', dateOfBirth: '1981-01-15', address: { id: 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 5, firstName: 'Susmitha', lastName: 'Lokinindi', dateOfBirth: '1985-02-04', address: { id: 14, street: 'Columbi Rd', town: 'Columbia', county: 'Howard', postcode: '21044' }, customerImage: { key: 'file_key', url: 'file_url' } },
  /*  {id: 6, firstName: 'Anand', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 7, firstName: 'Sachin', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 8, firstName: 'Bumbra', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 9, firstName: 'Rajesh', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 10, firstName: 'Rajan', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 11, firstName: 'Bhavesh', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 12, firstName: 'Hardik', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 13, firstName: 'Kishan', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 14, firstName: 'Purvi', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 15, firstName: 'Salil', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
  {id: 16, firstName: 'Halil', lastName: 'Patel' , dateOfBirth: '1981-01-15', address : {id : 14, street: 'Ellicott City Rd', town: 'Ellicott City', county: 'Howard', postcode: '21044'} },
*/  { id: 17, firstName: 'Brijesh', lastName: 'Kandra', dateOfBirth: '1986-12-12', address: { id: 14, street: 'Ellicott City Rd', town: 'Chicago', county: 'Howard', postcode: '21044' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 18, firstName: 'Jeevan', lastName: 'Patel', dateOfBirth: '1983-10-10', address: { id: 14, street: 'Ellicott City Rd', town: 'Des Plaines', county: 'Howard', postcode: '21044' }, customerImage: { key: 'file_key', url: 'file_url' } },
    { id: 19, firstName: 'Sachin', lastName: 'Tendulkar', dateOfBirth: '1982-02-16', address: { id: 15, street: 'Germantown Rd', town: 'Germantown', county: 'Montogomery', postcode: '21045' }, customerImage: { key: 'file_key', url: 'file_url' } }
];

@Injectable()
export class CustomerService {

    //read the prefix from the 
    private endpointUrlPrefix: string = environment.endpointUrlPrefix;

    //define url prefix for different operations
    private getUrl: string = '/customers';
    private crudUrl: string = '/customer';
    private searchUrl: string = '/customer/search?name=';

    private headers = new Headers( {
        'Content-Type': 'application/json'
        /*,
        'Authorization': 'Bearer ' //+ this.authenticationService.getToken()
*/    } );

    constructor( private http: Http ) {
        console.log( "----------> endpointUrlPrefix: " + this.endpointUrlPrefix );
    }

    getAllCustomer(): Observable<Customer[]> {
        let finalUrl = this.endpointUrlPrefix + this.getUrl;
        console.log( "----------> Invoking get all customers on URL: " + finalUrl );
        //return CUSTOMER_LIST;
        return this.http
            .get( finalUrl )
            .map(
            response => response.json() as Customer[]
            ).catch( error => {
                // TODO: add real error handling
                console.log( "----------> error details: " + error );
                return Observable.of<Customer[]>( [] );
            } );
    }

    createCustomer( formData: FormData ) {
        let finalUrl = ( this.endpointUrlPrefix + '' + this.crudUrl );
        console.log( "----------> Invoking create customer on URL: " + finalUrl );
        
        //return CUSTOMER_LIST;
        return this.http
            .post( finalUrl, formData )
            .map(
            response => response.json() as Number
            ).catch( error => {
                // TODO: add real error handling
                console.log( "----------> error details: " + error );
                return Observable.throw( "Error occurred while creating a customer." );
            } );
    }

    updateCustomer( customer: Customer ) {
        let finalUrl = ( this.endpointUrlPrefix + '' + this.crudUrl );
        console.log( "----------> Invoking update customer on URL: " + finalUrl );
        //return CUSTOMER_LIST;
        return this.http
            .put( finalUrl, customer, this.headers )
            .map(
            response => response as any
            ).catch( error => {
                // TODO: add real error handling
                console.log( "----------> error details: " + error );
                return Observable.throw( "Error occurred while updating a customer." );
            } );
    }

    getCustomerDetails( customerId: number ) {
        let finalUrl = this.endpointUrlPrefix + this.crudUrl + '/' + customerId;
        console.log( "----------> Invoking get customer details on URL: " + finalUrl );
        return this.http
            .get( finalUrl )
            .map(
            response => response.json() as Customer
            ).catch( error => {
                // TODO: add real error handling
                console.log( "----------> error details: " + error );
                return Observable.of<Customer>();
            } );
    }

    deleteCustomer( customerId: number ): Observable<Customer> {
        let finalUrl = this.endpointUrlPrefix + this.crudUrl + '/' + customerId;
        console.log( "----------> Invoking delete customer on URL: " + finalUrl );
        return this.http
            .delete( finalUrl, this.headers )
            .map(
                response => response as any
            ).catch( error => {
                // TODO: add real error handling
                console.log( "----------> error details: " + error );
                return Observable.throw( "Error occurred while deleting a customer." );
            });
    }

    search( term: string ): Observable<Customer[]> {
        return this.http
            .get( `api/heroes/?name=${term}` )
            .map( response => response.json().data as Customer[] );
    }

}
