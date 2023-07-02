export interface Car {
  _id?: string;
  name?: string;
  plate?: string;
  model?: string;
  owner?: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
}
