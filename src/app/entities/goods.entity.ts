export class Good {
  name: string;
  categoryId: string;
  fields: GoodField[];
  count: number;
  price: number;
}

export class GoodField {
  key: string;
  type: FieldType;
  value: string;
}

export enum FieldType {
  text,
  number,
  date,
  datetime,
}

export class GoodEvent {
  date: string;
  type: GoodEventType;
  count: number;
}

export enum GoodEventType {
  in,
  out,
}
