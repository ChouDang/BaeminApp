import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { foods, PrismaClient } from '@prisma/client';

@Injectable()
export class FoodsService {
  prisma = new PrismaClient()

  async addFoodsToRestaurant(food: Omit<foods, 'id'>, img: Express.Multer.File) {
    console.log(img)
    try {
      return this.prisma.foods.create({
        data: {
          ...food,
          stock: +food.stock,
          price: +food.price,
          img: img ? img.path : null,
        },
      });
    } catch (error) {
      console.log(error, "error")
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllFoods() {
    try {
      return this.prisma.foods.findMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getFoodsById(id : string) {
    try {
      return this.prisma.foods.findMany({
        where:{ id }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delFoods(id: string) {
    try {
      return this.prisma.foods.delete({
        where: { id }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
