import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import express from 'express';
import { Repository } from 'typeorm';
import { PaquetesEntity } from '../entities/paquetes.entity';
import { RequestCrearPaqueteDto } from '../dto/request/request-crear-paquete.dto';
import { RequestActualizarPaqueteDto } from '../dto/request/request-actualizar-paquete.dto';
import { DateTime } from 'luxon';

@Injectable()
export class ZoomService {
  constructor(
    @InjectRepository(PaquetesEntity)
    private readonly paquetesRepository: Repository<PaquetesEntity>,
  ) {}

  /**
   * Función Listado de Paquetes
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

  /**
   * Función Crear Paquete
   * @param parameters
   * @param response
   */
  async crearPaqueteService(
    parameters: RequestCrearPaqueteDto,
    @Res() response: express.Response,
  ): Promise<any> {
    try {
      const array_errors: any[] = [];

      const json_paquete = await this.paquetesRepository.count({
        where: {
          codigo_guia: parameters.codigo_guia.trim().toUpperCase(),
        },
      });

      if (json_paquete > 0) {
        array_errors.push('El Código Guía ya existe');
      }

      if (parameters.peso_kg <= 0) {
        array_errors.push('El peso no puede ser menor a 0');
      }

      if (
        parameters.estado.trim().toUpperCase() !== 'REGISTRADO' &&
        parameters.estado.trim().toUpperCase() !== 'EN_TRANSITO' &&
        parameters.estado.trim().toUpperCase() !== 'ENTREGADO' &&
        parameters.estado.trim().toUpperCase() !== 'DEVUELTO'
      ) {
        array_errors.push(
          'estado debe ser REGISTRADO, EN_TRANSITO, ENTREGADO o DEVUELTO',
        );
      }

      if (array_errors.length > 0) {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Petición mal hecha',
          errors: array_errors,
        });
      } else {
        const new_paquete = new PaquetesEntity();

        new_paquete.codigo_guia = parameters.codigo_guia.trim().toUpperCase();
        new_paquete.destinatario = parameters.destinatario;
        new_paquete.ciudad_destino = parameters.ciudad_destino;
        new_paquete.peso_kg = parameters.peso_kg;
        new_paquete.estado = parameters.estado.trim().toUpperCase();
        new_paquete.creado_por = 1;

        await this.paquetesRepository.save(new_paquete);

        response.status(HttpStatus.CREATED).json({
          statusCode: 201,
          message: 'Paquete Creado satisfactoriamente',
          data: [],
        });
      }
    } catch (err) {
      console.error(err);

      const error_message =
        err instanceof Error ? err.message : 'Unexpected error';

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Error en servicio Crear Paquete',
        errors: [error_message],
      });
    }
  }

  /**
   * Función Actualizar Paquete
   * @param id
   * @param parameters
   * @param response
   */
  async actualizarPaqueteService(
    id: number,
    parameters: RequestActualizarPaqueteDto,
    @Res() response: express.Response,
  ): Promise<any> {
    try {
      const array_errors: any[] = [];

      if (
        parameters.estado.trim().toUpperCase() !== 'REGISTRADO' &&
        parameters.estado.trim().toUpperCase() !== 'EN_TRANSITO' &&
        parameters.estado.trim().toUpperCase() !== 'ENTREGADO' &&
        parameters.estado.trim().toUpperCase() !== 'DEVUELTO'
      ) {
        array_errors.push(
          'estado debe ser REGISTRADO, EN_TRANSITO, ENTREGADO o DEVUELTO',
        );
      }

      const json_paquete = await this.paquetesRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!json_paquete) {
        array_errors.push('ID del Paquete no fue encontrado');
      }

      if (array_errors.length > 0) {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Petición mal hecha',
          errors: array_errors,
        });
      } else {
        json_paquete!.estado = parameters.estado.trim().toUpperCase();
        json_paquete!.actualizado_en = new Date();

        await this.paquetesRepository.save(json_paquete!);

        response.status(HttpStatus.CREATED).json({
          statusCode: 200,
          message: 'Paquete Actualizado satisfactoriamente',
          data: [],
        });
      }
    } catch (err) {
      console.error(err);

      const error_message =
        err instanceof Error ? err.message : 'Unexpected error';

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Error en servicio Crear Paquete',
        errors: [error_message],
      });
    }
  }
}
