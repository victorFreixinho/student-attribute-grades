export type Attribute = {
  id: number;
  name: string;
};

export type Student = {
  id: number;
  name: string;
  age: number;
  attributes: Attribute[];
};

export enum Tabs {
  STUDENTS = "students",
  ATTRIBUTES = "attributes",
}
