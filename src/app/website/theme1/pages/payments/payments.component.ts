import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from 'src/app/services/themes-manager.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(
    public _themeService: ThemesManagerService
  ) { }

  ngOnInit(): void {
  }

}
