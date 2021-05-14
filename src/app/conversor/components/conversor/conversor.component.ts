import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversaoResponse } from '../../models/conversao-response.model';
import { Conversao } from '../../models/conversao.model';
import { Moeda } from '../../models/moeda.model';
import { ConversorService } from '../../services/conversor.service';
import { MoedaService } from '../../services/moeda.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: ConversaoResponse;
  
  @ViewChild("conversaoForm") conversaoForm: NgForm;
  
  constructor(private moedaService: MoedaService, 
    private ConversorService: ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */  
  init(): void {
    this.conversao = new Conversao();
    this.conversao.moedaDe = "USD";
    this.conversao.moedaPara = "BRL";
    this.possuiErro = false;
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */  
  converter(): void {
    if(this.conversaoForm.form.valid)
      alert('Convertendo: ' + JSON.stringify(this.conversao));
  }

  

}
