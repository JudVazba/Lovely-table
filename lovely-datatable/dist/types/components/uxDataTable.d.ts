import { LitElement, TemplateResult } from 'lit';
import { TableColumn, TableRow } from './types.js';
export declare class UxDataTable extends LitElement {
    columns: TableColumn[];
    data: TableRow[];
    emptyDataText: string;
    showExpanderIcon: boolean;
    expanderIconColor: string;
    expanderIconPosition: 'first' | 'last';
    onRowClick?: (row: TableRow) => void;
    onCellClick?: (data: {
        row: TableRow;
        column: TableColumn;
        value: any;
    }) => void;
    onRowMouseEnter?: (row: TableRow) => void;
    onRowMouseLeave?: (row: TableRow) => void;
    onCellMouseEnter?: (data: {
        row: TableRow;
        column: TableColumn;
        value: any;
    }) => void;
    onCellMouseLeave?: (data: {
        row: TableRow;
        column: TableColumn;
        value: any;
    }) => void;
    private expandedRowId;
    static styles: any[];
    private toggleRow;
    private renderCell;
    private renderRow;
    render(): TemplateResult<1>;
}
