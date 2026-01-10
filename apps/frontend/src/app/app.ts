import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'frontend';
  private primeng = inject(PrimeNG);

  ngOnInit() {
    this.primeng.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual',
      notEquals: 'Diferente',
      noFilter: 'Sem filtro',
      lt: 'Menor que',
      lte: 'Menor ou igual a',
      gt: 'Maior que',
      gte: 'Maior ou igual a',
      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      dateAfter: 'Data depois de',
      dateBefore: 'Data antes de',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Match All',
      matchAny: 'Match Any',
      addRule: 'Adicionar Regra',
      removeRule: 'Remover Regra',
      accept: 'Sim',
      reject: 'Não',
      choose: 'Escolher',
      upload: 'Upload',
      cancel: 'Cancelar',
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      today: 'Hoje',
      weekHeader: 'Sem',
    });
  }
}
