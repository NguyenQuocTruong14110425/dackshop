import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productpipe'
})
export class ProductpipePipe implements PipeTransform {

  transform(object: any, searchtext: any): any {
    if(!searchtext)
    {
      return object;
    }
    else
    {
    return object.filter((result)=>{

          return result.nameproduct.toLowerCase().indexOf(searchtext.toLowerCase())>-1;
       })
      }
  }
  

}


@Pipe({
  name: 'checkorder'
})
export class CheckorderPipe implements PipeTransform {

  transform(object: any, order: any): any {
    if(!order)
    {
      return null;
    }
    else
    {
    return object.filter((result)=>{
          return result.phone==order;
       })
      }
  }
  

}

@Pipe({
  name: 'filterprice'
})
export class sizePipe implements PipeTransform {

  transform(object: any, price: any): any {
    if(!price)
    {
      return object;
    }
    else
    {
    return object.filter((result)=>{
         return result.price >= +price;
       })
      }
  }
  

}


@Pipe({
  name: 'catalory'
})
export class cataloryPipe implements PipeTransform {
  transform(object: any,arg:any): any {
    console.log(object);
      let result:any[]=[]
       if(object)
       {
        console.log("catalog");
         console.log(object.size);
         object.arg.forEach(element => {
          console.log(element);
           if(result.indexOf(element)<=-1)
           {
             result.push(element);
           }
         });
       }
       return result.join();
      }
}

