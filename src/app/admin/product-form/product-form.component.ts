import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: ''
  };
  id;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {

    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');

    // tslint:disable-next-line:curly
    if (this.id) this.productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product) {
    // tslint:disable-next-line:curly
    if (this.id) this.productService.update(this.id, product);
    // tslint:disable-next-line:curly
    else this.productService.create(product);

    this.router.navigate(['/admin/produtos']);
  }

  deletar() {
    // tslint:disable-next-line:curly
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/produtos']);
  }

  ngOnInit() {
  }

}
