import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiljeskeService } from '../_services/biljeske.service';
import { Biljeska } from '../_modeli/biljeska';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-biljeska',
  templateUrl: './biljeska.component.html',
  styleUrls: ['./biljeska.component.css']
})
export class BiljeskaComponent implements OnInit{

  biljeska: any;
  biljeskaID: string = '';

  constructor(private route: ActivatedRoute, private biljeskeService: BiljeskeService, private toasterService: ToastrService){
    
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.biljeskaID = params['id'];
      this.biljeskeService.dohvatiBiljeskuPoId(this.biljeskaID).subscribe({
        next: response => {
          console.log(response);
          this.biljeska = response;
          console.log(this.biljeska);
        },
        error: error => {
          console.error(error);
        }
      })

    });
  }

  spremiBiljesku(){
    this.biljeskeService.azurirajBiljesku(this.biljeska).subscribe({
      next: response => {
        this.toasterService.success("Bilješka ažurirana");
      },
      error: error => {
        console.error(error);
      }
    })
  }
}
