import { css } from 'lit';

export const tableStyles = css`

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