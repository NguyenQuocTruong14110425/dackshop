import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class CustomerdbFilter implements PipeTransform{
    transform(customer: any, term: any): any {
        if(term==undefined) return customer;
        return customer.filter(function(customer){
            return customer.fullname.toLowerCase().includes(term.toLowerCase()) || 
            customer.address.toLowerCase().includes(term.toLowerCase())
        })
    }

}

