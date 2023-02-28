import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { StockDTO } from './dtos/stock.dto';
import { StockConsumer } from './stock.consumer';
import { StockService } from './stock.service';
//CLASE QUE EXPONE LA API 
@ApiTags('Stock')
@Controller('stock')
export class StockController {

    constructor(
        private _service:StockService,
        private _consumer:StockConsumer
    ){}


    @Post()
    @ApiOperation({ summary: 'Envia un mensaje a tpc-nca-stock' })
    async createEmployee(@Body() payload:StockDTO){
        console.log(payload)
        await this._service.producerStockMessage(payload);
    }
    @Get('searchMessage/:c_id_material')
    @ApiOperation({summary:'Consulta un mensaje a tpc-nca-stock'})
    async consultarEmployee(@Param('c_id_material') c_id_material:number){
        //PARA RETORNAR VALORES HAY QUE PONER EL RETURN
       return  this._consumer.searchMessage(c_id_material);
        
    }
    @Get('countMessage')
    @ApiOperation({summary:'Conteo de registros de documentos en infoStock_MX'})
    async countMessage(){
    return this._consumer.countMessage();
    }
    
}
