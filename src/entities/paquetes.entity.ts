import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('public.paquetes')
export class PaquetesEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'Identificador único',
  })
  id: number;

  @Column({
    type: 'character varying',
    length: 20,
    comment: 'Código guia',
  })
  codigo_guia: string;

  @Column({
    type: 'character varying',
    length: 100,
    comment: 'Destinatario',
  })
  destinatario: string;

  @Column({
    type: 'character varying',
    length: 60,
    comment: 'Ciudad destino',
  })
  ciudad_destino: string;

  @Column({
    type: 'numeric',
    comment: 'Peso en Kg',
  })
  peso_kg: number;

  @Column({
    type: 'character varying',
    length: 20,
    comment: 'Estado esperado: REGISTRADO, EN_TRANSITO, ENTREGADO, DEVUELTO',
  })
  estado: string;

  @Column({
    type: 'timestamp with time zone',
    comment: 'Fecha de creación del Registro',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creado_en: Date;

  @Column({
    type: 'integer',
    comment: 'Registro creado por',
  })
  creado_por: number;

  @Column({
    type: 'timestamp with time zone',
    comment: 'Fecha de actualización del Registro',
    nullable: true,
  })
  actualizado_en: Date;

  @Column({
    type: 'integer',
    comment: 'Registro actualizado por',
    nullable: true,
  })
  actualizado_por: number;
}
