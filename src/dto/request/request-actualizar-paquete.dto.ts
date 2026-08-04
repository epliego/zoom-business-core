import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestActualizarPaqueteDto {
  @IsNotEmpty({ message: 'peso_kg no debería estar vacío' })
  @IsString({ message: 'peso_kg debe ser una cadena de caracteres' })
  @ApiProperty()
  readonly estado: string;
}
