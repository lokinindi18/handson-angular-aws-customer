import { Address } from "app/model/address.model";
import { CustomerImage } from "app/model/customer.image.model";

export class Customer{
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: Address;
    customerImage: CustomerImage;
}