import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  cols: number = 12;
  height: string = '65';

  constructor() { }

  ngOnInit(): void {
    this.cols = (window.innerWidth <= 350) ? 1 : 4;
    this.height = (window.innerWidth <= 300) ? '65' : '165';
  }

  onResize(event: any) {
    this.cols = (event.target.innerWidth <= 350) ? 1 : 4;
    this.height = (event.target.innerWidth <= 300) ? '65' : '165';
    

  }

}
