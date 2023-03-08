import { Injectable } from '@nestjs/common/decorators';
import { OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../kafka/consumer/consumer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockDocument } from 'libs/helpers/src';
import { Data, IStock } from './interfaces/stock.interface';
import {StockEnum as topics} from './constants/stock.enum'
import { Console } from 'console';
@Injectable()
export class StockConsumer implements OnModuleInit {
  constructor(
    private _consumer: ConsumerService,
    @InjectModel(StockDocument.name)
    private readonly repository: Model<StockDocument>,
  ) {}

  async onModuleInit() {
    // this._consumer.consume(
    //   'tpc-nca-stock',
    //   {
    //     topic: topics.tpc_nca_stock,
    //   },
    //   {
    //     eachMessage: async ({ topic, partition, message }) => {
    //       const startTime = performance.now();
    //       const messageString = message.value.toString();
    //       const messageObj: IStock = JSON.parse(messageString);

    //       const { data } = messageObj;
    //       await this.logicData(data);
    //       const endTime = performance.now();
    //       const elapsedTime = endTime - startTime;
    //       console.log(`Tiempo transcurrido: ${elapsedTime} ms`);
    //     },
    //   },
    // );
    
  }

  async initConsumer(groupId:string, topic:string){
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
          
        console.log(data);
        
          await this.logicData(data);
        },
      },
    );
  }

  async initConsumerBatch(groupId:string, topic:string){
    await this._consumer.consume(
      groupId,
      {
        topic: topic,
      },
      {
       eachBatch: async ({batch, resolveOffset, heartbeat}) => {
        console.log(`Procesando batch con ${batch.messages.length} mensajes`);
        const batchStartTime = new Date().getTime();
        for (const message of batch.messages) {
          const messageString = message.value.toString();
          const messageObj: any = JSON.parse(messageString);
          await this.logicData(messageObj);
        }
        const batchEndTime = new Date().getTime();
        console.log(`Batch procesado en ${batchEndTime - batchStartTime} ms`);
        await resolveOffset(batch.lastOffset());
       }
      },
    );
}




  async logicData(data: Data) {
    const { C_MATERIAL, C_ID_MATERIAL, C_ESTADO, CuentaStokAcanalados } = data;

    if (C_ESTADO === 'EN11' || CuentaStokAcanalados === 'NO') {
      await this.repository.findOneAndDelete({ "data.C_MATERIAL":C_MATERIAL });
    } else {
      await this.repository.findOneAndUpdate(
        { "data.C_MATERIAL":C_MATERIAL },
        {
          $set: {
            "_id":C_MATERIAL,
            "data.C_MATERIAL":C_MATERIAL,
            "data.C_ID_MATERIAL":C_ID_MATERIAL,
            "data.data_Inventario":data
            // C_MATERIAL: C_MATERIAL,
            // C_ID_MATERIAL: C_ID_MATERIAL,
            // data_Inventario: data,
          },
        },
        { upsert: true, returnOriginal: false },
      );
    }
  }

  async searchMessage(c_id_material: number){
    
    let myCollection =await this.repository.findOne({C_ID_MATERIAL:c_id_material}); 
    return myCollection;
  }

  async countMessage(){
    let count = await this.repository.count({});
    return count;
  }
}
