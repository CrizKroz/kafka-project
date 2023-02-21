import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockDTO } from './dtos/stock.dto';
import { StockService } from './stock.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {

    constructor(
        private _service:StockService
    ){}

    @Post()
    @ApiOperation({ summary: 'Envia un mensaje a tpc-nca-stock' })
    async createEmployee(@Body() payload:StockDTO){
        await this._service.producerStockMessage(payload);
    }
    
}
