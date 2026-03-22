import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  async create(createProductDto: CreateProductDto) {
  const product = this.productRepository.create(createProductDto);
  return await this.productRepository.save(product);

}


  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
  const product = await this.productRepository.findOne({
    where: { productId: id }
  });
  if (!product)
    throw new NotFoundException();
  return product;
}

  async findByProvider(id: string) {
  const products = await this.productRepository.find({
    where: { provider: id }
  });
  if (products.length === 0)
    throw new NotFoundException();
  return products;
}


    async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    await this.productRepository.update(
      { productId: id },
      updateProductDto
    );
    return await this.findOne(id);
}


  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return {
      message: "Producto eliminado"
    };
}

}
  