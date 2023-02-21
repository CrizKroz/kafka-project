import { ApiProperty } from '@nestjs/swagger';

export class Data {
  @ApiProperty({ type: Number, required: true, example:  96137613})
  C_ID_MATERIAL: number;
  @ApiProperty({ type: String, required: true, example: 'SI' })
  CuentaStokAcanalados: string;
  @ApiProperty({ type: String, required: true, example: 'Juventud' })
  C_UBICACION_PLANTA_DESC: string;
  @ApiProperty({ type: String, required: true, example: '' })
  C_OBSERVACIONES: string;
  @ApiProperty({ type: Number, required: true, example: 0 })
  N_PIEZAS: number;
  @ApiProperty({ type: String, required: true, example: '1ra' })
  C_CALIDAD: string;
  @ApiProperty({ type: String, required: true, example: '003002939388' })
  C_NECESIDAD: string;
  @ApiProperty({ type: String, required: true, example: 'Aceptado' })
  C_DICTAMEN_DESC: string;
  @ApiProperty({ type: String, required: true, example: '1658467811' })
  UTCTime: number;
  @ApiProperty({ type: String, required: true, example: '0502953081000010' })
  C_OFA: string;
  @ApiProperty({ type: String, required: true, example: '20210407' })
  F_FECHA_PRODUCCION: string;
  @ApiProperty({ type: String, required: true, example: 'COMEREDC' })
  C_CLAVE: string;
  @ApiProperty({ type: String, required: true, example: 'MP517435' })
  C_PRODUCTO_COD: string;
  @ApiProperty({ type: String, required: true, example: 'JUVCS' })
  C_UBICACION_DEPOSITO: string;
  @ApiProperty({ type: Number, required: true, example: 1178713 })
  C_ID_STOCK: number;
  @ApiProperty({ type: String, required: true, example: 'MX' })
  Pais: string;
  @ApiProperty({ type: String, required: true, example: '2022-07-22T00:30:11.007Z'})
  timestamp: Date;
  @ApiProperty({ type: String, required: true, example: 'EMBG3_UNI' })
  C_LINEA_ANTERIOR: string;
  @ApiProperty({ type: String, required: true, example: 'Bodega Aceros Prime' })
  C_LINEA_ACTUAL_DESC: string;
  @ApiProperty({ type: String, required: true, example: '00' })
  C_UBICACION_LOTE: string;
  @ApiProperty({ type: Number, required: true, example: 0.2923  })
  N_ESPESOR: number;
  @ApiProperty({ type: Number, required: true, example: 42067624 })
  n_id_ejecucion: number;
  @ApiProperty({ type: Number, required: true, example: 2818 })
  N_LARGO: number;
  @ApiProperty({ type: String, required: true, example: 'TM01' })
  C_SOCIEDAD: string;
  @ApiProperty({ type: Number, required: true, example: 1 })
  N_BIT_ZONA_DESPACHO: number;
  @ApiProperty({ type: String, required: true, example: 'C071TM' })
  C_GRADO: string;
  @ApiProperty({ type: String, required: true, example: '2073142011' })
  C_COLADA: string;
  @ApiProperty({ type: String, required: true, example: 'MI' })
  C_MERCADO_COD: string;
  @ApiProperty({ type: String, required: true, example: 'PT' })
  C_ESTADO_POR_PRODUCTO: string;
  @ApiProperty({ type: String, required: true, example: 'APT' })
  C_LINEA_ACTUAL: string;
  @ApiProperty({ type: String, required: true, example: 'Sobre Orden' })
  C_RESOLUCION_DESC: string;
  @ApiProperty({ type: String, required: true, example: 'APT' })
  C_LINEA_PROXIMA: string;
  @ApiProperty({ type: String, required: true, example: 'JUV' })
  C_UBICACION_PLANTA: string;
  @ApiProperty({ type: String, required: true, example: 'STS' })
  C_ESTRATEGIA: string;
  @ApiProperty({ type: String, required: true, example: 'JUVMNTZNT' })
  C_UBICACION_ZONA: string;
  @ApiProperty({ type: String, required: true, example: '3B243665UG301' })
  C_MATERIAL: string;
  @ApiProperty({ type: String, required: true, example: '20220721' })
  C_FECHA_ULTIMO_MOVIMIENTO: string;
  @ApiProperty({ type: String, required: true, example: 919 })
  N_ANCHO: number;
  @ApiProperty({ type: String, required: true, example: 'BOBINA' })
  C_TIPO_MATERIAL: string;
  @ApiProperty({ type: String, required: true, example: 'MDIS' })
  C_ESTADO: string;
  @ApiProperty({ type: String, required: true, example: '7883_MA' })
  C_IDRED: string;
  @ApiProperty({ type: String, required: true, example: 5895 })
  N_PESO_NETO: number;
  @ApiProperty({ type: String, required: true, example: '07' })
  C_UBICACION_FILA: string;
  @ApiProperty({ type: String, required: true, example: 96137613 })
  c_llave: number;
}

export class StockDTO {
  @ApiProperty({ type: Data, required: true })
  data: Data;
  @ApiProperty({ type: String, required: true, example: 'Stock' })
  domain: string;
  @ApiProperty({ type: String, required: true, example: 'Inventario' })
  trx: string;
}
