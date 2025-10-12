export interface TableColumn {
  key: string;
  label: string;
  type?: string;
  width?: string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
  children?: TableRow[];
}