import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestCrearPaqueteDto {
  @IsNotEmpty({ message: 'codigo_guia no debería estar vacío' })
  @IsString({ message: 'codigo_guia debe ser una cadena de caracteres' })
  @ApiProperty()
  readonly codigo_guia: string;

  @IsNotEmpty({ message: 'destinatario no debería estar vacío' })
  @IsString({ message: 'destinatario debe ser una cadena de caracteres' })
  @ApiProperty()
  readonly destinatario: string;

  @IsNotEmpty({ message: 'ciudad_destino no debería estar vacío' })
  @IsString({ message: 'ciudad_destino debe ser una cadena de caracteres' })
  @ApiProperty()
  readonly ciudad_destino: string;

  @IsNotEmpty({ message: 'peso_kg no debería estar vacío' })
  @IsNumber(
    {},
    {
      message:
        'peso_kg debe ser un número que cumpla con las restricciones especificadas',
    },
  )
  @ApiProperty()
  readonly peso_kg: number;

  @IsNotEmpty({ message: 'peso_kg no debería estar vacío' })
  @IsString({ message: 'peso_kg debe ser una cadena de caracteres' })
  @ApiProperty()
  readonly estado: string;
}
