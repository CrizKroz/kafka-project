import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsumerSubscribeTopic } from 'kafkajs';
import { StockDTO } from './dtos/stock.dto';
import { StockConsumer } from './stock.consumer';
import { StockService } from './stock.service';
import { ConsumerService } from '../kafka/consumer/consumer.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {

    constructor(

    ){}
}
