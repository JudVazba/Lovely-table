import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TableColumn, TableRow } from './types.js';

@customElement('ux-datatable-child')
export class UxDataTableChild extends LitElement {
  @property({ type: Object }) row!: TableRow;
  @property({ type: Array }) columns: TableColumn[] = [];

  static styles = css`
    :host {
      display: contents;
    }
    td {
      background: #fafafa;
      border: 1px solid #ddd;
      padding: 8px;
    }
  `;

  private renderCell(value: any, type?: string) {
    return type === 'image'
      ? html`<img src="${value}" width="48" height="48">`
      : html`${value}`;
  }

  render() {
    return html`
      <tr class="child-row">
        ${this.columns.map(col => html`
          <td>${this.renderCell(this.row[col.key], col.type)}</td>
        `)}
      </tr>
    `;
  }
}
