import {Observable,Observer} from 'rxjs';


//const obs$ = Observable.create();

  const observer:Observer<any> = {
    next:value => console.log('siguiente [next]:',value),
    error:error =>console.warn('error',error),
    complete:() =>console.info('completado'),

}


const intervalos$ = new Observable<number>(subscriber =>{
  let count  =0;
  count ++;
    //crea un contador
    const interval =setInterval(()=>{
      subscriber.next(count);
      console.log(count);
    },1000);


    setTimeout(()=>{
        
      subscriber.complete();
    },2500);
   
 return ()=>{
  clearInterval(interval);
  console.log('intervalo destruido')

}
});

const subs1 =intervalos$.subscribe(observer);
const subs2 =intervalos$.subscribe(observer);
const subs3 =intervalos$.subscribe(observer);

subs1.add(subs2)
     .add(subs3);


setTimeout(()=>{
 // subs1.unsubscribe()
/*subs1.unsubscribe()
subs2.unsubscribe()
subs3.unsubscribe()
*/

console.log('completado tiemout');

},3000);
  
