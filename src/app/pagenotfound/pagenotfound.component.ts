import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  error = '404 - NOT FOUND - SOMETHING WRONG';


  constructor() { }

  ngOnInit(): void {
  }

}
