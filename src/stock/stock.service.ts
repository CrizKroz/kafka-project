import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';
import {StockDTO} from './dtos/stock.dto'
import {StockEnum as topic} from './constants/stock.enum'
@Injectable()
export class StockService {

    constructor(
    ){}

}

