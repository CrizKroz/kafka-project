import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ConsumerSubscribeTopic } from 'kafkajs';
import { StockDTO } from './dtos/stock.dto';
import { StockConsumer } from './stock.consumer';
import { StockService } from './stock.service';
import { ConsumerService } from '../kafka/consumer/consumer.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
    constructor(
        private readonly _stockConsumer:StockConsumer
    ){}

    @Post('/inicializarConsumer/:groupid/:topic/:messageCount')
    @ApiOperation({ summary: 'Inicia un consumidor' })
    @ApiParam({name:'groupid', example:'tpc-nca-stock'})
    @ApiParam({name:'topic', example:'tpc-nca-stock'})
    async initConsumer(
        @Param('groupid') groupid: string,
        @Param('topic') topic: string,
        ){
        await this._stockConsumer.initConsumer(groupid,topic);
    }
}
