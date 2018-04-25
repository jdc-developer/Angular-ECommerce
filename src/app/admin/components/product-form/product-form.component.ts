import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: Product = {
    key: '',
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

    if (this.id) this.productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/produtos']);
  }

  deletar() {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/produtos']);
  }

  ngOnInit() {
  }

}
