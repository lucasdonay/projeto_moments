import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = 'Compartilhar!'

  constructor() { }

  ngOnInit(): void {
  }

  createHandler(event: any) {
    console.log('deu boa');

  }

}
