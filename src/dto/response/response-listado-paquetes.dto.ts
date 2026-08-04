import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseListadoPaquetesDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly codigo_guia: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly destinatario: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly ciudad_destino: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly peso_kg: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly estado: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 'DD/MM/AAA HH:MM' })
  readonly creado_en: Date;
}
