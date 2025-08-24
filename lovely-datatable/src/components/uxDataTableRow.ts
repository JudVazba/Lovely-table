import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TableColumn, TableRow } from './types.js';

@customElement('ux-datatable-row')
export class UxDataTableRow extends LitElement {
  @property({ type: Object }) row!: TableRow;
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Boolean }) expanded = false;

  static styles = css`
    :host {
      display: table-row-group;
    }
    tr {
      cursor: pointer;
    }
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    tr.expandable {
      background: #f9f9f9;
    }
  `;

  private renderCell(value: any, type?: string) {
    return type === 'image'
      ? html`<img src="${value}" width="48" height="48">`
      : html`${value}`;
  }

  render() {
    return html`
      <tr class=${this.row.children ? 'expandable' : ''}>
        ${this.columns.map(col => html`
          <td>${this.renderCell(this.row[col.key], col.type)}</td>
        `)}
      </tr>
    `;
  }
}
