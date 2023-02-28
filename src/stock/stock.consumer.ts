import { Injectable } from '@nestjs/common/decorators';
import { OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer/consumer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockDocument } from 'libs/helpers/src';
import { Data, IStock } from './interfaces/stock.interface';
import {StockEnum as topics} from './constants/stock.enum'
@Injectable()
export class StockConsumer implements OnModuleInit {
  constructor(
    private _consumer: ConsumerService,
    @InjectModel(StockDocument.name)
    private readonly repository: Model<StockDocument>,
  ) {}

  async onModuleInit() {
    this._consumer.consume(
      'tpc-nca-stock',
      {
        topic: topics.tpc_nca_stock,
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const messageString = message.value.toString();
          const messageObj: IStock = JSON.parse(messageString);

          const { data } = messageObj;

          console.log(data); // Imprime la data que llega en el mensaje
        },
      },
    );
    
  }

  async logicData(data: Data) {
    const { C_MATERIAL, C_ID_MATERIAL, C_ESTADO, CuentaStokAcanalados } = data;


    if (C_ESTADO === 'EN11' || CuentaStokAcanalados === 'NO') {
      await this.repository.findOneAndDelete({ C_MATERIAL: C_MATERIAL });
    } else {
      await this.repository.findOneAndUpdate(
        { C_MATERIAL: C_MATERIAL },
        {
          $set: {
            C_MATERIAL: C_MATERIAL,
            C_ID_MATERIAL: C_ID_MATERIAL,
            data_Inventario: data,
          },
        },
        { upsert: true, returnOriginal: false },
      );
    }
  }

  
}
