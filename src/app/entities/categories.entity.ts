export class Category {
  name: string;
  fields: CategoryField[];
}

export class CategoryField {
  key: string;
  type: FieldType;
}

export enum FieldType {
  text,
  number,
  date,
  datetime,
}
