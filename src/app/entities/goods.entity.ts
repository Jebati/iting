export class Good {
  name: string;
  category: string;
  fields: GoodField[];
  count: number;
  price: number;
}

export class GoodField {
  key: string;
  type: string;
  value: string;
}
