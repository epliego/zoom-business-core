import { Body, Controller, Post, Res, Get, Query } from '@nestjs/common';
import express from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZoomService } from '../services/zoom.service';
import { ResponseListadoPaquetesDto } from '../dto/response/response-listado-paquetes.dto';
import { ResponseEmptyDto } from '../dto/response/response-empty.dto';
import { RequestCrearPaqueteDto } from '../dto/request/request-crear-paquete.dto';

@ApiTags('zoom')
@ApiBearerAuth()
@Controller('api')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  /**
   * API listado de Paquetes
   * @param estado
   * @param response
   */
  @ApiOperation({
    summary: 'API listado de Paquetes',
  })
  @ApiInternalServerErrorResponse({
    description: '<b>Error Message:</b> Error en servicio Listado de Paquetes',
  })
  @ApiOkResponse({
    description: 'Listado de Paquetes obtenidos satisfactoriamente',
    type: ResponseListadoPaquetesDto,
  })
  @ApiQuery({ name: 'estado', required: false, type: String })
  @Get('paquetes')
  async listadoPaquetes(
    @Query('estado') estado: string = '',
    @Res() response: express.Response,
  ): Promise<any> {
    return this.zoomService.listadoPaquetesService(estado, response);
  }

  /**
   * API Crear Paquete
   * @param parameters
   * @param response
   */
  @ApiOperation({
    summary: 'API crear Paquete',
  })
  @ApiBadRequestResponse({
    description:
      '<b>Bad Request:</b><br/>' +
      '1.- codigo_guia debe ser una cadena de caracteres<br/>' +
      '2.- destinatario debe ser una cadena de caracteres<br/>' +
      '3.- ciudad_destino debe ser una cadena de caracteres<br/>' +
      '4.- peso_kg debe ser un número que cumpla con las restricciones especificadas<br/>' +
      '5.- estado debe ser una cadena de caracteres<br/>' +
      '6.- El Código Guía ya existe<br/>' +
      '7.- El peso no puede ser menor a 0<br/>' +
      '8.- estado debe ser REGISTRADO, EN_TRANSITO, ENTREGADO o DEVUELTO',
  })
  @ApiInternalServerErrorResponse({
    description: '<b>Error Message:</b> Error en servicio Crear Paquete',
  })
  @ApiCreatedResponse({
    description: 'Paquete Creado satisfactoriamente',
    type: ResponseEmptyDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('paquetes')
  async crearPaquete(
    @Body() parameters: RequestCrearPaqueteDto,
    @Res() response: express.Response,
  ): Promise<any> {
    return this.zoomService.crearPaqueteService(parameters, response);
  }
}
