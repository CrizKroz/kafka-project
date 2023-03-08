import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class dataInventario {
  @Prop({ type: Number })
  C_ID_MATERIAL: number;
  @Prop({ type: String })
  C_MATERIAL: string;
  @Prop({ type: String })
  CuentaStokAcanalados: string;
  @Prop({ type: String })
  C_UBICACION_PLANTA_DESC: string;
  @Prop({ type: String })
  C_OBSERVACIONES: string;
  @Prop({ type: Number })
  N_PIEZAS: number;
  @Prop({ type: String })
  C_CALIDAD: string;
  @Prop({ type: String })
  C_NECESIDAD: string;
  @Prop({ type: String })
  C_DICTAMEN_DESC: string;
  @Prop({ type: String })
  UTCTime: number;
  @Prop({ type: String })
  C_OFA: string;
  @Prop({ type: String })
  F_FECHA_PRODUCCION: string;
  @Prop({ type: String })
  C_CLAVE: string;
  @Prop({ type: String })
  C_PRODUCTO_COD: string;
  @Prop({ type: String })
  C_UBICACION_DEPOSITO: string;
  @Prop({ type: Number })
  C_ID_STOCK: number;
  @Prop({ type: String })
  Pais: string;
  @Prop({ type: String })
  timestamp: Date;
  @Prop({ type: String })
  C_LINEA_ANTERIOR: string;
  @Prop({ type: String })
  C_LINEA_ACTUAL_DESC: string;
  @Prop({ type: String })
  C_UBICACION_LOTE: string;
  @Prop({ type: Number })
  N_ESPESOR: number;
  @Prop({ type: Number })
  n_id_ejecucion: number;
  @Prop({ type: Number })
  N_LARGO: number;
  @Prop({ type: String })
  C_SOCIEDAD: string;
  @Prop({ type: Number })
  N_BIT_ZONA_DESPACHO: number;
  @Prop({ type: String })
  C_GRADO: string;
  @Prop({ type: String })
  C_COLADA: string;
  @Prop({ type: String })
  C_MERCADO_COD: string;
  @Prop({ type: String })
  C_ESTADO_POR_PRODUCTO: string;
  @Prop({ type: String })
  C_LINEA_ACTUAL: string;
  @Prop({ type: String })
  C_RESOLUCION_DESC: string;
  @Prop({ type: String })
  C_LINEA_PROXIMA: string;
  @Prop({ type: String })
  C_UBICACION_PLANTA: string;
  @Prop({ type: String })
  C_ESTRATEGIA: string;
  @Prop({ type: String })
  C_UBICACION_ZONA: string;
  @Prop({ type: String })
  C_FECHA_ULTIMO_MOVIMIENTO: string;
  @Prop({ type: String })
  N_ANCHO: number;
  @Prop({ type: String })
  C_TIPO_MATERIAL: string;
  @Prop({ type: String })
  C_ESTADO: string;
  @Prop({ type: String })
  C_IDRED: string;
  @Prop({ type: String })
  N_PESO_NETO: number;
  @Prop({ type: String })
  C_UBICACION_FILA: string;
  @Prop({ type: String })
  c_llave: number;
}

class data {
  @Prop({ type: String })
  C_ID_MATERIAL: string;
  @Prop({ type: String })
  C_MATERIAL: string;
  @Prop({ type: dataInventario })
  data_Inventario: dataInventario;
}

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'infoStock_MX',
  versionKey: 'version',
})
export class StockDocument extends Document {
  @Prop({ required: true, unique: false })
  _id: string;
  @Prop({ type: data })
  data: data;
}

export const StockSchema = SchemaFactory.createForClass(StockDocument);
