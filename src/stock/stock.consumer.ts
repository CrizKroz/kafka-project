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

  async onModuleInit() {

  }

  async initConsumer(groupId: string, topic: string, seconds:number) {
    let messageCounter = 0;
    let startTime: number;
    const timeout = seconds * 1000;
    return await this._consumer.consume(
      groupId,
      {
        topic: topic,
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const messageString = message.value.toString();
          const messageObj: IStock = JSON.parse(messageString);
      
          const { data } = messageObj;
          await this.logicData(data);
  
          // Incrementamos el contador de mensajes
          messageCounter++;
          // Si es el primer mensaje, iniciamos el temporizador
          if (!startTime) {
            startTime = Date.now();
          }
  
          // Si el tiempo transcurrido es mayor que el intervalo de tiempo deseado
          if (Date.now() - startTime > timeout) {
            // Calculamos la tasa de mensajes
            const rate = messageCounter / (timeout / 1000);
  
            // Registramos la tasa de mensajes
            this.logger.debug(`Procesados ${messageCounter} mensajes en ${timeout}ms (${rate.toFixed(2)} msg/s)`);
  
            // Reseteamos el contador de mensajes y el tiempo inicial
            messageCounter = 0;
            startTime = Date.now();
          }
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
