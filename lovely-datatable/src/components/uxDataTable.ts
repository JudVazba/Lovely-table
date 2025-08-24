import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TableColumn, TableRow } from './types.js';
import './uxDataTableRow.js';
import './uxDataTableChild.js';

@customElement('ux-datatable')
export class UxDataTable extends LitElement {
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: TableRow[] = [];

  @state() private expandedRowId: string | number | null = null;

  static styles = css`
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th {
      border: 1px solid #ddd;
      padding: 8px;
    }
  `;

  private toggleRow(rowId: string | number) {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.columns.map(col => html`<th>${col.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(row => html`
            <ux-datatable-row
              .row=${row}
              .columns=${this.columns}
              .expanded=${this.expandedRowId === row.id}
              @click=${() => row.children && this.toggleRow(row.id)}
            ></ux-datatable-row>

            ${row.children && this.expandedRowId === row.id ? row.children.map(child => html`
              <ux-datatable-child
                .row=${child}
                .columns=${this.columns}
              ></ux-datatable-child>
            `) : ''}
          `)}
        </tbody>
      </table>
    `;
  }
}
