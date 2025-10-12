import { css as v, LitElement as y, html as c } from "lit";
import { property as d, state as m, customElement as b } from "lit/decorators.js";
import { repeat as x } from "lit/directives/repeat.js";
import { classMap as f } from "lit/directives/class-map.js";
const w = v`

    :host {
        --lovely-dt-border-color: #ddd;
        --lovely-dt-row-bg-odd: #fff;
        --lovely-dt-row-bg-even: #f9f9f9;
        --lovely-dt-row-bg-child: #fafafa;
        --lovely-dt-row-font-family: inherit;
        --lovely-dt-row-bg-hover: #e0f0ff;
        --lovely-dt-text-color-hover: #000;
        --lovely-dt-expander-icon-color: #000;
    }
    
    :host > div { 
        overflow-x: auto;
        width: 100%;
    }

    table {
        border-collapse: collapse;
        min-width: 37.5em;
        width: 100%;
        font-family: var(--lovely-dt-row-font-family);
    }
    
    th {
        border: 1px solid var(--lovely-dt-border-color);
        padding: 8px;
        text-align: left;
        vertical-align: bottom;
    }

    td {
        border: 1px solid var(--lovely-dt-border-color);
        padding: 8px;
        vertical-align: top;
    }
    
    tr:not(.child-row):nth-child(odd) {
        background-color: var(--lovely-dt-row-bg-odd);
    }

    tr:not(.child-row):nth-child(even) {
        background-color: var(--lovely-dt-row-bg-even);
    }

    tr.child-row td {
        background-color: var(--lovely-dt-row-bg-child);
    }

    .expandable {
        cursor: pointer;
    }

    .expander-icon {
        transition: transform 0.2s;
        display: inline-block;
        font-weight: bold;
        font-size: 1.2em;
        line-height: 1;
        color: var(--lovely-dt-expander-icon-color);
    }
    .expander-icon.expanded {
        transform: rotate(90deg);
    }
    
    .icon-cell, .icon-header {
        width: auto !important; 
        min-width: 20px !important; 
        max-width: 40px !important; 
        padding: 0 !important;  
        text-align: center;
        vertical-align: middle;
    }

    .icon-cell.fill, .icon-header.fill {
        width: 20px !important;
        padding: 8px !important; 
        background-color: transparent !important; 
    }

    tr.selected {
        background-color: #a5d6a7 !important;
        font-weight: bold;
        cursor: default;
    }

    tr:hover:not(.child-row):not(.selected) {
        background-color: var(--lovely-dt-row-bg-hover) !important;
        color: var(--lovely-dt-text-color-hover) !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
        transition: all 0.2s ease-in-out;
    }

    tr.selected:hover {
        box-shadow: none;
        transform: none;
    }
`;
var g = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, s = (o, l, r, i) => {
  for (var t = i > 1 ? void 0 : i ? $(l, r) : l, p = o.length - 1, a; p >= 0; p--)
    (a = o[p]) && (t = (i ? a(l, r, t) : a(t)) || t);
  return i && t && g(l, r, t), t;
};
let n = class extends y {
  constructor() {
    super(...arguments), this.columns = [], this.data = [], this.emptyDataText = "No hay datos disponibles.", this.showExpanderIcon = !0, this.expanderIconColor = "#000", this.expanderIconPosition = "first", this.expandedRowId = null;
  }
  toggleRow(o) {
    this.expandedRowId = this.expandedRowId === o ? null : o;
  }
  renderCell(o, l) {
    const r = o[l.key], i = r == null || r === "" ? "-" : r, t = (a, h) => {
      a.stopPropagation();
      const e = { row: o, column: l, value: i };
      h === "cell-click" && this.onCellClick && this.onCellClick(e), h === "cell-mouseenter" && this.onCellMouseEnter && this.onCellMouseEnter(e), h === "cell-mouseleave" && this.onCellMouseLeave && this.onCellMouseLeave(e);
    }, p = l.type === "image" ? c`<img src="${r}" width="48" height="48" style="vertical-align: middle;">` : c`${i}`;
    return c`
            <td 
                @click=${(a) => t(a, "cell-click")}
                @mouseenter=${(a) => t(a, "cell-mouseenter")}
                @mouseleave=${(a) => t(a, "cell-mouseleave")}
            >
                ${p}
            </td>
        `;
  }
  renderRow(o, l = !1) {
    const r = !!o.children && !l, i = this.expandedRowId === o.id, t = this.showExpanderIcon, p = r ? c`<span 
                class="${f({ "expander-icon": !0, expanded: i })}" 
                style="color: ${this.expanderIconColor};"
                >▶</span>` : null, a = (e, u) => {
      if (e.stopPropagation(), u === "click" && r) {
        this.toggleRow(o.id);
        return;
      }
      this.onRowClick && u === "click" && this.onRowClick(o), this.onRowMouseEnter && u === "mouseenter" && this.onRowMouseEnter(o), this.onRowMouseLeave && u === "mouseleave" && this.onRowMouseLeave(o);
    }, h = (e) => c`<td class="${f({ "icon-cell": !0, fill: e === null })}" style="cursor: ${r ? "pointer" : "default"};">${e}</td>`;
    return c`
            <tr 
                class="${f({ expandable: r, "child-row": l })}"
                @click=${(e) => a(e, "click")}
                @mouseenter=${(e) => a(e, "mouseenter")}
                @mouseleave=${(e) => a(e, "mouseleave")}
            >
                
                ${t && this.expanderIconPosition === "first" ? h(p) : t && this.expanderIconPosition === "last" ? h(null) : ""}

                ${x(this.columns, (e) => e.key, (e) => this.renderCell(o, e))}

                ${t && this.expanderIconPosition === "last" ? h(p) : t && this.expanderIconPosition === "first" ? h(null) : ""}
            </tr>
            
            ${r && i && o.children ? c`
                    ${x(o.children, (e) => e.id, (e) => this.renderRow(e, !0))}
                ` : ""}
        `;
  }
  render() {
    const o = this.columns, l = this.showExpanderIcon && this.expanderIconPosition, r = o.length + (l ? 1 : 0), i = (t) => c`<th class="${f({ "icon-header": !0, fill: t })}"></th>`;
    return !this.data || this.data.length === 0 ? c`
                <table>
                    <tr>
                        <td colspan="${r}" style="text-align: center; padding: 20px;">
                            ${this.emptyDataText}
                        </td>
                    </tr>
                </table>
            ` : c`
            <table>
                <thead>
                    <tr>
                        ${l && this.expanderIconPosition === "first" ? i(!1) : l && this.expanderIconPosition === "last" ? i(!0) : ""}
                        
                        ${o.map((t) => c`<th style="width: ${t.width || "auto"};">${t.label}</th>`)}
                        
                        ${l && this.expanderIconPosition === "last" ? i(!1) : l && this.expanderIconPosition === "first" ? i(!0) : ""}
                    </tr>
                </thead>
                <tbody>
                    ${x(this.data, (t) => t.id, (t) => this.renderRow(t))}
                </tbody>
            </table>
        `;
  }
};
n.styles = [w];
s([
  d({ type: Array })
], n.prototype, "columns", 2);
s([
  d({ type: Array })
], n.prototype, "data", 2);
s([
  d({ type: String })
], n.prototype, "emptyDataText", 2);
s([
  d({ type: Boolean })
], n.prototype, "showExpanderIcon", 2);
s([
  d({ type: String })
], n.prototype, "expanderIconColor", 2);
s([
  d({ type: String })
], n.prototype, "expanderIconPosition", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onRowClick", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onCellClick", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onRowMouseEnter", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onRowMouseLeave", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onCellMouseEnter", 2);
s([
  d({ attribute: !1 })
], n.prototype, "onCellMouseLeave", 2);
s([
  m()
], n.prototype, "expandedRowId", 2);
n = s([
  b("lovely-datatable")
], n);
export {
  n as UxDataTable
};
