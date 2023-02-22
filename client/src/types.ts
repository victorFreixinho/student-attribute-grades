export type Attribute = {
  id: string;
  name: string;
};

export type Student = {
  id: string;
  name: string;
  age: string;
  attributes: string[]; // array of attribute names
};
