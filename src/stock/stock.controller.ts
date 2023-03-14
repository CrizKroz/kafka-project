import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiProperty } from '@nestjs/swagger';
import { ConsumerSubscribeTopic } from 'kafkajs';
import { StockDTO } from './dtos/stock.dto';
import { StockConsumer } from './stock.consumer';
import { StockService } from './stock.service';
import { ConsumerService } from '../kafka/consumer/consumer.service';
import { SecondsEnum } from './constants/stock.enum';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
    constructor(
        private readonly _stockConsumer:StockConsumer,
        private readonly _consumerServide:ConsumerService
    ){
    }
    
    @Post('/inicializarConsumer/:groupid/:topic/:messageCount/:seconds')
    @ApiOperation({ summary: 'Inicia un consumidor' })
    @ApiParam({name:'groupid', example:'tpc-nca-stock'})
    @ApiParam({name:'topic', example:'tpc-nca-stock'})
    @ApiParam({name:'seconds', enum:SecondsEnum, enumName:'seconds'})
    async initConsumer(
        @Param('groupid') groupid: string,
        @Param('topic') topic: string,
        @Param('seconds') seconds:number
        ){
        return await this._stockConsumer.initConsumer(groupid,topic,seconds);
    }

    @Get('/getconsumerRegistry')
    @ApiOperation({ summary: 'Obtiene el registro de consumidores' })
    async getconsumerRegistry(){
        return this._consumerServide.getconsumerRegistry();
    }

}
