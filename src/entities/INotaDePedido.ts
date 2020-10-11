import { IItem } from "./IItem";

export interface INotaDePedido {
  itemId: IItem;
  cantidad: number;
  email?:string,
  phone?:string,
}
