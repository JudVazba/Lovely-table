
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

// @ts-ignore
import { tableStyles } from '../styles/tableStyles.js'; 

import { TableColumn, TableRow } from './types.js';

@customElement('ux-datatable')
export class UxDataTable extends LitElement {
    @property({ type: Array }) columns: TableColumn[] = [];
    @property({ type: Array }) data: TableRow[] = [];

    @property({ type: String }) emptyDataText: string = 'No hay datos disponibles.';
    @property({ type: Boolean }) showExpanderIcon: boolean = true;
    @property({ type: String }) expanderIconColor: string = '#000';
    @property({ type: String }) expanderIconPosition: 'first' | 'last' = 'first';

    @property({ attribute: false }) onRowClick?: (row: TableRow) => void;
    @property({ attribute: false }) onCellClick?: (data: { row: TableRow, column: TableColumn, value: any }) => void;
    @property({ attribute: false }) onRowMouseEnter?: (row: TableRow) => void;
    @property({ attribute: false }) onRowMouseLeave?: (row: TableRow) => void;
    @property({ attribute: false }) onCellMouseEnter?: (data: { row: TableRow, column: TableColumn, value: any }) => void;
    @property({ attribute: false }) onCellMouseLeave?: (data: { row: TableRow, column: TableColumn, value: any }) => void;

    @state() private expandedRowId: string | number | null = null;

    static styles = [tableStyles]; 

    private toggleRow(rowId: string | number) {
        this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
    }
    
    private renderCell(row: TableRow, column: TableColumn): TemplateResult {
        const value = row[column.key];
        const content = value === null || value === undefined || value === '' ? '-' : value;
        
        const handleCellEvent = (e: Event, eventName: string) => {
            e.stopPropagation();
            const data = { row, column, value: content };
            if (eventName === 'cell-click' && this.onCellClick) this.onCellClick(data);
            if (eventName === 'cell-mouseenter' && this.onCellMouseEnter) this.onCellMouseEnter(data);
            if (eventName === 'cell-mouseleave' && this.onCellMouseLeave) this.onCellMouseLeave(data);
        };
        
        const cellContent = column.type === 'image'
            ? html`<img src="${value}" width="48" height="48" style="vertical-align: middle;">`
            : html`${content}`;
        
        return html`
            <td 
                @click=${(e: Event) => handleCellEvent(e, 'cell-click')}
                @mouseenter=${(e: Event) => handleCellEvent(e, 'cell-mouseenter')}
                @mouseleave=${(e: Event) => handleCellEvent(e, 'cell-mouseleave')}
            >
                ${cellContent}
            </td>
        `;
    }
    
    private renderRow(row: TableRow, isChild: boolean = false): TemplateResult {
        const isExpandable = !!row.children && !isChild;
        const isExpanded = this.expandedRowId === row.id;
        const showIcon = this.showExpanderIcon;

        const expanderIcon = isExpandable 
            ? html`<span 
                class="${classMap({'expander-icon': true, 'expanded': isExpanded})}" 
                style="color: ${this.expanderIconColor};"
                >▶</span>` 
            : null;
        
        const handleRowEvent = (e: Event, eventName: string) => {
            e.stopPropagation();
            if (eventName === 'click' && isExpandable) {
                this.toggleRow(row.id);
                return;
            }
            if (this.onRowClick && eventName === 'click') this.onRowClick(row);
            if (this.onRowMouseEnter && eventName === 'mouseenter') this.onRowMouseEnter(row);
            if (this.onRowMouseLeave && eventName === 'mouseleave') this.onRowMouseLeave(row);
        };

        const iconCell = (content: TemplateResult | null) => html`<td class="${classMap({'icon-cell': true, 'fill': content === null})}" style="cursor: ${isExpandable ? 'pointer' : 'default'};">${content}</td>`;
        
        return html`
            <tr 
                class="${classMap({'expandable': isExpandable, 'child-row': isChild})}"
                @click=${(e: Event) => handleRowEvent(e, 'click')}
                @mouseenter=${(e: Event) => handleRowEvent(e, 'mouseenter')}
                @mouseleave=${(e: Event) => handleRowEvent(e, 'mouseleave')}
            >
                
                ${showIcon && this.expanderIconPosition === 'first' 
                    ? iconCell(expanderIcon) 
                    : showIcon && this.expanderIconPosition === 'last' 
                    ? iconCell(null) 
                    : ''}

                ${repeat(this.columns, (col) => col.key, (col) => this.renderCell(row, col))}

                ${showIcon && this.expanderIconPosition === 'last' 
                    ? iconCell(expanderIcon) 
                    : showIcon && this.expanderIconPosition === 'first' 
                    ? iconCell(null) 
                    : ''}
            </tr>
            
            ${isExpandable && isExpanded && row.children
                ? html`
                    ${repeat(row.children, (child) => child.id, (child) => this.renderRow(child, true))}
                `
                : ''}
        `;
    }

    render() {
        const columns = this.columns;
        const showExpander = this.showExpanderIcon && this.expanderIconPosition;
        const totalCols = columns.length + (showExpander ? 1 : 0);
        
        const iconHeader = (isFiller: boolean) => html`<th class="${classMap({'icon-header': true, 'fill': isFiller})}"></th>`;

        if (!this.data || this.data.length === 0) {
            return html`
                <table>
                    <tr>
                        <td colspan="${totalCols}" style="text-align: center; padding: 20px;">
                            ${this.emptyDataText}
                        </td>
                    </tr>
                </table>
            `;
        }

        return html`
            <table>
                <thead>
                    <tr>
                        ${showExpander && this.expanderIconPosition === 'first' 
                            ? iconHeader(false) 
                            : showExpander && this.expanderIconPosition === 'last' 
                            ? iconHeader(true) 
                            : ''}
                        
                        ${columns.map(col => html`<th style="width: ${col.width || 'auto'};">${col.label}</th>`)}
                        
                        ${showExpander && this.expanderIconPosition === 'last' 
                            ? iconHeader(false) 
                            : showExpander && this.expanderIconPosition === 'first' 
                            ? iconHeader(true) 
                            : ''}
                    </tr>
                </thead>
                <tbody>
                    ${repeat(this.data, (row) => row.id, (row) => this.renderRow(row))}
                </tbody>
            </table>
        `;
    }
}