type Categoria = 'M' | 'A' | 'J';

export class Ticket {
  _id!: number;
  precioPasaje!: number;
  categoriaPasajero!: Categoria;
  fechaCompra!: string;
  pasajero!: string;
}
