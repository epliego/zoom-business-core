import { Body, Controller, Post, Res, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ZoomService } from '../services/zoom.service';
import { PaquetesEntity } from '../entities/paquetes.entity';

@ApiTags('zoom')
@ApiBearerAuth()
@Controller('api')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  /**
   * API listado de Paquetes
   * @param parameters
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
    type: PaquetesEntity,
  })
  @ApiQuery({ name: 'estado', required: false, type: String })
  @Get('paquetesLista')
  async listadoPaquetes(
    @Query('estado') estado: string = '',
    @Res()
    response: any,
  ): Promise<any> {
    return this.zoomService.listadoPaquetesService(estado, response);
  }

  // /**
  //  * API get value Catalog
  //  * @param parameters
  //  * @param response
  //  */
  // @ApiOperation({
  //   summary: 'API get value Catalog',
  // })
  // @ApiBadRequestResponse({
  //   description:
  //     '<b>Bad Request:</b><br/>' +
  //     '1.- category must be a string<br/>' +
  //     '2.- category should not be empty',
  // })
  // @ApiInternalServerErrorResponse({
  //   description: '<b>Error Message:</b> Error in service value Catalog',
  // })
  // @ApiOkResponse({
  //   description: 'Get value Catalog successfully',
  //   type: ValuesCatalogEntity,
  // })
  // @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @Post('values-catalog/value')
  // async getValueCatalog(
  //   @Body() parameters: RequestValueCatalogDto,
  //   @Res() response: any,
  // ): Promise<any> {
  //   return this.configurationCalatogService.getValueCatalogService(
  //     parameters,
  //     response,
  //   );
  // }
}
