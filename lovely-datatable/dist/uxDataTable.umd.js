(function(e,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("lit"),require("lit/decorators.js"),require("lit/directives/repeat.js"),require("lit/directives/class-map.js")):typeof define=="function"&&define.amd?define(["exports","lit","lit/decorators.js","lit/directives/repeat.js","lit/directives/class-map.js"],r):(e=typeof globalThis<"u"?globalThis:e||self,r(e.LovelyTable={},e.Lit,e.LitDecorators,e.LitRepeat,e.LitClassMap))})(this,function(e,r,d,f,u){"use strict";const v=r.css`

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
`;var x=Object.defineProperty,m=Object.getOwnPropertyDescriptor,s=(b,t,i,a)=>{for(var n=a>1?void 0:a?m(t,i):t,l=b.length-1,p;l>=0;l--)(p=b[l])&&(n=(a?p(t,i,n):p(n))||n);return a&&n&&x(t,i,n),n};e.UxDataTable=class extends r.LitElement{constructor(){super(...arguments),this.columns=[],this.data=[],this.emptyDataText="No hay datos disponibles.",this.showExpanderIcon=!0,this.expanderIconColor="#000",this.expanderIconPosition="first",this.expandedRowId=null}toggleRow(t){this.expandedRowId=this.expandedRowId===t?null:t}renderCell(t,i){const a=t[i.key],n=a==null||a===""?"-":a,l=(c,h)=>{c.stopPropagation();const o={row:t,column:i,value:n};h==="cell-click"&&this.onCellClick&&this.onCellClick(o),h==="cell-mouseenter"&&this.onCellMouseEnter&&this.onCellMouseEnter(o),h==="cell-mouseleave"&&this.onCellMouseLeave&&this.onCellMouseLeave(o)},p=i.type==="image"?r.html`<img src="${a}" width="48" height="48" style="vertical-align: middle;">`:r.html`${n}`;return r.html`
            <td 
                @click=${c=>l(c,"cell-click")}
                @mouseenter=${c=>l(c,"cell-mouseenter")}
                @mouseleave=${c=>l(c,"cell-mouseleave")}
            >
                ${p}
            </td>
        `}renderRow(t,i=!1){const a=!!t.children&&!i,n=this.expandedRowId===t.id,l=this.showExpanderIcon,p=a?r.html`<span 
                class="${u.classMap({"expander-icon":!0,expanded:n})}" 
                style="color: ${this.expanderIconColor};"
                >▶</span>`:null,c=(o,y)=>{if(o.stopPropagation(),y==="click"&&a){this.toggleRow(t.id);return}this.onRowClick&&y==="click"&&this.onRowClick(t),this.onRowMouseEnter&&y==="mouseenter"&&this.onRowMouseEnter(t),this.onRowMouseLeave&&y==="mouseleave"&&this.onRowMouseLeave(t)},h=o=>r.html`<td class="${u.classMap({"icon-cell":!0,fill:o===null})}" style="cursor: ${a?"pointer":"default"};">${o}</td>`;return r.html`
            <tr 
                class="${u.classMap({expandable:a,"child-row":i})}"
                @click=${o=>c(o,"click")}
                @mouseenter=${o=>c(o,"mouseenter")}
                @mouseleave=${o=>c(o,"mouseleave")}
            >
                
                ${l&&this.expanderIconPosition==="first"?h(p):l&&this.expanderIconPosition==="last"?h(null):""}

                ${f.repeat(this.columns,o=>o.key,o=>this.renderCell(t,o))}

                ${l&&this.expanderIconPosition==="last"?h(p):l&&this.expanderIconPosition==="first"?h(null):""}
            </tr>
            
            ${a&&n&&t.children?r.html`
                    ${f.repeat(t.children,o=>o.id,o=>this.renderRow(o,!0))}
                `:""}
        `}render(){const t=this.columns,i=this.showExpanderIcon&&this.expanderIconPosition,a=t.length+(i?1:0),n=l=>r.html`<th class="${u.classMap({"icon-header":!0,fill:l})}"></th>`;return!this.data||this.data.length===0?r.html`
                <table>
                    <tr>
                        <td colspan="${a}" style="text-align: center; padding: 20px;">
                            ${this.emptyDataText}
                        </td>
                    </tr>
                </table>
            `:r.html`
            <table>
                <thead>
                    <tr>
                        ${i&&this.expanderIconPosition==="first"?n(!1):i&&this.expanderIconPosition==="last"?n(!0):""}
                        
                        ${t.map(l=>r.html`<th style="width: ${l.width||"auto"};">${l.label}</th>`)}
                        
                        ${i&&this.expanderIconPosition==="last"?n(!1):i&&this.expanderIconPosition==="first"?n(!0):""}
                    </tr>
                </thead>
                <tbody>
                    ${f.repeat(this.data,l=>l.id,l=>this.renderRow(l))}
                </tbody>
            </table>
        `}},e.UxDataTable.styles=[v],s([d.property({type:Array})],e.UxDataTable.prototype,"columns",2),s([d.property({type:Array})],e.UxDataTable.prototype,"data",2),s([d.property({type:String})],e.UxDataTable.prototype,"emptyDataText",2),s([d.property({type:Boolean})],e.UxDataTable.prototype,"showExpanderIcon",2),s([d.property({type:String})],e.UxDataTable.prototype,"expanderIconColor",2),s([d.property({type:String})],e.UxDataTable.prototype,"expanderIconPosition",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onRowClick",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onCellClick",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onRowMouseEnter",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onRowMouseLeave",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onCellMouseEnter",2),s([d.property({attribute:!1})],e.UxDataTable.prototype,"onCellMouseLeave",2),s([d.state()],e.UxDataTable.prototype,"expandedRowId",2),e.UxDataTable=s([d.customElement("lovely-datatable")],e.UxDataTable),Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
