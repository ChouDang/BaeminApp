import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { foods } from '@prisma/client';
import { PaymentService } from './payment.service';

@ApiBearerAuth()
@ApiTags('Payment')
@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @ApiOperation({ summary: 'Tao don hang' })
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user-uuid' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              foodId: { type: 'string', example: 'food-uuid' },
              quantity: { type: 'number', example: 2 },
            },
          },
        },
      },
    },
  })
  createOrders(@Body() createPaymentDto: {
    userId: string;
    items: {
      foodId: string;
      quantity: number;
    }[];
  }) {
    console.log(createPaymentDto,"createPaymentDto")
    return this.paymentService.createOrders(createPaymentDto);
  }

  @ApiOperation({ summary: 'tat ca don hang' })
  @Get("order")
  getAllOrder () {
    return this.paymentService.getAllOrder()
  }


  @ApiOperation({ summary: 'chi tiet don hang' })
  @Get("orderDetail")
  getOrderDetail (@Query('id') id: string) {
    return this.paymentService.getOrderDetail(id)
  }

  @ApiOperation({ summary: 'del don hang' })
  @Delete("order")
  delOrder (@Query('id') id: string) {
    return this.paymentService.delOrder(id)
  }

}
