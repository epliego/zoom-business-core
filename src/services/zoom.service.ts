import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import express from 'express';
import { Repository } from 'typeorm';
//import { ZoomRepository } from '../repositories/zoom.repository';
import { PaquetesEntity } from '../entities/paquetes.entity';
import { DateTime } from 'luxon';

@Injectable()
export class ZoomService {
  constructor(
    //private readonly zoomRepository: ZoomRepository,
    @InjectRepository(PaquetesEntity)
    private readonly paquetesRepository: Repository<PaquetesEntity>,
  ) {}

  /**
   * Función listado de Paquetes
   * @param estado
   * @param response
   */
  async listadoPaquetesService(
    estado: string | null,
    @Res() response: express.Response,
  ): Promise<any> {
    try {
      let json_paquetes: PaquetesEntity[] = [];
      if (estado) {
        json_paquetes = await this.paquetesRepository.find({
          where: {
            estado: estado.trim().toUpperCase(),
          },
        });
      } else {
        json_paquetes = await this.paquetesRepository.find();
      }

      const array_paquetes: any[] = [];
      for (const paquete of json_paquetes) {
        array_paquetes.push({
          id: paquete.id,
          codigo_guia: paquete.codigo_guia,
          destinatario: paquete.destinatario,
          ciudad_destino: paquete.ciudad_destino,
          peso_kg: paquete.peso_kg,
          estado: paquete.estado,
          creado_en: DateTime.fromISO(new Date(paquete.creado_en).toISOString())
            .setLocale('es')
            .toFormat('dd/MM/yyyy t'),
        });
      }

      response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Listado de Paquetes obtenidos satisfactoriamente',
        system_message: [],
        data: array_paquetes,
      });
    } catch (err) {
      console.error(err);

      const error_message =
        err instanceof Error ? err.message : 'Unexpected error';

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Error en servicio Listado de Paquetes',
        errors: [error_message],
      });
    }
  }
}
