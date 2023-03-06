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
        private _service:StockService,
        private _stockconsumer:StockConsumer,
        private _consumerService:ConsumerService
    ){}


    @Post()
    @ApiOperation({ summary: 'Envia un mensaje a tpc-nca-stock' })
    async createStockMessage(@Body() payload:StockDTO){
        await this._service.producerStockMessage(payload);
    }

    @Post('/inicializarConsumer/:groupid/:topic')
    @ApiOperation({ summary: 'Inicia un consumidor' })
    async initConsumer(
        @Param('groupid') groupid:string,
        @Param('topic') topic:string
        ){
            console.log(groupid,topic);
        await this._stockconsumer.initConsumer(groupid,topic);
    }

    @Post('/inicializarConsumerBatch/:groupid/:topic')
    @ApiOperation({ summary: 'Inicia un consumidor de Batch' })
    async initConsumerBatch(
        @Param('groupid') groupid:string,
        @Param('topic') topic:string
        ){
            console.log(groupid,topic);
        await this._stockconsumer.initConsumerBatch(groupid,topic);
    }

    // @Get('getActiveConsumers/:groupId')
    // @ApiOperation({ summary: 'Obtiene los consumidores activos' })
    // async getActiveConsumers (
    //     @Param('groupId') groupId:string
    // ){
    //     return await this._consumerService.describeGroups(groupId);
    // }
    async createEmployee(@Body() payload:StockDTO){
        console.log(payload)
        await this._service.producerStockMessage(payload);
    }
    @Get('searchMessage/:c_id_material')
    @ApiOperation({summary:'Consulta un mensaje a tpc-nca-stock'})
    async consultarEmployee(@Param('c_id_material') c_id_material:number){
        //PARA RETORNAR VALORES HAY QUE PONER EL RETURN
       return  this._stockconsumer.searchMessage(c_id_material);
        
    }
    @Get('countMessage')
    @ApiOperation({summary:'Conteo de registros de documentos en infoStock_MX'})
    async countMessage(){
    return this._stockconsumer.countMessage();
    }
    
}
