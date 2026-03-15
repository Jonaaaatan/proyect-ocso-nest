import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Natural",
      price: 17,
      countSeal: 3,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: "Coca cola 600ml",
      price: 20,
      countSeal: 2,
      provider: uuid()
    },
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;  
  }

  findAll() {
    return this.products;
  }

  findOne(productId: string) {
     const product = this.products.filter((product) => product.productId === productId)[0];
    if (!product) throw new NotFoundException();

    return product;
  }

  findByProvider(id: string) {
    const productsFound = this. products.filter((product) => product.provider ===id)
    if (!productsFound) throw new NotFoundException()
    return productsFound;
  }

  update(productId: string, updateProductDto: UpdateProductDto) {

    let productToUpdate = this.findOne(productId);

    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto
    };
    if (!productToUpdate) throw new NotFoundException();

    this.products = this.products.map((product) => {
      if (product.productId === productId) {
        product = productToUpdate;
      }
      return product;
    });

    return productToUpdate;
  }

   remove(productId: string) {
    this.findOne(productId);

    this.products = this.products.filter(
      (product) => product.productId !== productId
    );

    return this.products;
  }
}
