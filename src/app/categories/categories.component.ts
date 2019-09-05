import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  brand_id: string;
  categories: any = [];

  constructor(
    private data: DataService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.brand_id = this.route.snapshot.paramMap.get('brand_id');

    this.showCatergories();
  }  

  showCatergories() {
    let sendData = {
      brand_id: this.brand_id
    }

    this.data.categoryList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.categories = res.data;
          //console.log(this.categories);
        } else {
          console.log("No response");
        }
      });
  }

  moveProduct(type, category_id) {
    if(type=='B')
      this.router.navigate(['/products/brand_'+category_id]);
    else if(type=='C')
      this.router.navigate(['/products/cat_'+category_id]);
  }

  moveCart() {
    this.router.navigate(['/cart']);
  }

}
