import { ApiProperty } from '@nestjs/swagger';

export class TopicAndConfigDTO {

  @ApiProperty({ type: String, required: true, example:  'tpc-nca-stock'})
  groupId: string;
  @ApiProperty({ type: String, required: true, example: 'tpc-nca-stock' })
  topoc: string;
  @ApiProperty({ type: String, required: true, example: 'Juventud' })
  C_UBICACION_PLANTA_DESC: string;
}