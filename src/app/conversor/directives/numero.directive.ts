import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[numeroDirective]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  /**
   * Implementa evento de keyup para o elemento da diretiva.
   * 
   * @param any $event
   */
  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor = $event.target.value;
    let posDecimais = valor.indexOf('.');
    
    //Expressão regular que indica tudo que não é número.
    valor = valor.replace(/[\D]/g, '');

    if(posDecimais > 0) {
      valor = valor.substr(0, posDecimais) + '.' + valor.substr(posDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor);

  }

  /**
   * Obtém o valor contido na model.
   * 
   * @param any value
   */  
  writeValue(obj: any): void {
    this.el.nativeElement.value = obj;
  }

  /**
   * Registra função a ser chamada para atualizar 
   * valor na model.
   * 
   * @param any fn
   */  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra função a ser chamada para atualizar 
   * valor na model para evento touched.
   * 
   * @param any fn
   */  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }  

}
