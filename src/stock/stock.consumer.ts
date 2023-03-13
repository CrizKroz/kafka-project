import { Injectable } from '@nestjs/common/decorators';
import { Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer/consumer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockDocument } from 'libs/helpers/src';
import { Data, IStock } from './interfaces/stock.interface';
import { StockEnum as topics } from './constants/stock.enum';
@Injectable()
export class StockConsumer implements OnModuleInit {
  private readonly logger = new Logger(ConsumerService.name);
  constructor(
    private _consumer: ConsumerService,
    @InjectModel(StockDocument.name)
    private readonly repository: Model<StockDocument>,
  ) {}

  async onModuleInit() {}

  async initConsumer(groupId: string, topic: string) {
    let messageCounter = 0;
    let startTime: number;
    let endTime: number;
  
    await this._consumer.consume(
      groupId,
      {
        topic: topic,
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const messageString = message.value.toString();
          const messageObj: IStock = JSON.parse(messageString);
  
          const { data } = messageObj;
          messageCounter++;
          if (messageCounter === 1) {
            startTime = performance.now();
          }
          if (messageCounter === parseInt(process.env.NUM_MESSAGES_TO_LOG)) {
            endTime = performance.now();
            const elapsedTime = endTime - startTime;
            this.logger.log(`Se recibieron ${process.env.NUM_MESSAGES_TO_LOG} mensajes en ${elapsedTime} ms`);
            messageCounter = 0;
          }
          await this.logicData(data);
        },
      },
    );
  }
  

  async logicData(data: Data) {
    const { C_MATERIAL, C_ESTADO, CuentaStokAcanalados } = data;
    let { C_ID_MATERIAL } = data;
    if (C_ESTADO === 'EN11' || CuentaStokAcanalados === 'NO') {
      await this.repository.findOneAndDelete({ _id: C_MATERIAL },{projection:{_id:0}});
    } else {
      await this.repository.findOneAndUpdate(
        { _id: C_MATERIAL },
        {
          $set: {
            _id: C_MATERIAL,
            'data.C_MATERIAL': C_MATERIAL,
            'data.C_ID_MATERIAL': C_ID_MATERIAL.toString(),
            'data.data_Inventario': data,
          },
        },
        { upsert: true, returnOriginal: false },
      );
    }
  }

  async searchMessage(c_id_material: number) {
    let myCollection = await this.repository.findOne({
      C_ID_MATERIAL: c_id_material,
    });
    return myCollection;
  }

  async countMessage() {
    let count = await this.repository.count({});
    return count;
  }
}
