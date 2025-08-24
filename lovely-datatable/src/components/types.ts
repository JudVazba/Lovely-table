export interface TableColumn {
  key: string;
  label: string;
  type?: string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
  children?: TableRow[];
}
