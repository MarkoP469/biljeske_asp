import { Component, OnInit } from '@angular/core';
import { BiljeskeService } from '../_services/biljeske.service';
import { Biljeska } from '../_modeli/biljeska';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-biljeske',
  templateUrl: './biljeske.component.html',
  styleUrls: ['./biljeske.component.css']
})
export class BiljeskeComponent implements OnInit{

  novaBiljeska = {
    naziv: '',
    sadrzaj: ''
  }
  biljeske: Biljeska[] = [];

  constructor(private biljeskeService: BiljeskeService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.dohvatiSveBiljeske();
  }

  dohvatiSveBiljeske(){
    this.biljeske = [];
    this.biljeskeService.dohvatiSveBiljeske().subscribe({
      next: response => {
        response.map((item: Biljeska) => {
          this.biljeske.push(item);
        });
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  obrisiBiljesku(biljeska: Biljeska){
    console.log(biljeska);
    this.biljeskeService.obrisiBiljesku(biljeska.id).subscribe({
      next: response => {
        this.toastrService.success("Obrisano");
        this.dohvatiSveBiljeske();
      },
      error: error => {
        console.error(error);
      }
    })
  }

  spremiNovuBiljesku(){
    this.biljeskeService.spremiNovuBiljesku(this.novaBiljeska).subscribe({
      next: response => {
        this.novaBiljeska = {
          naziv: '',
          sadrzaj: ''
        };
        this.toastrService.success("Bilješka spremljena.");
        this.dohvatiSveBiljeske();
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
