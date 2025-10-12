# UX Data Table Web Component

A highly customizable and responsive data table Web Component built with **Lit** and **TypeScript**. This component supports hierarchical data (expandable rows), extensive CSS variable customization (including hover effects), and accessibility-focused design choices.

[![npm version](https://badge.fury.io/js/ux-datatable-component.svg)](https://www.npmjs.com/package/ux-datatable-component)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 📦 Installation

Install the component using npm:

```bash
npm install ux-datatable-component
🚀 Usage
You can use the component in any HTML, JavaScript, or framework-based project.

1. Basic Setup (Plain HTML/JavaScript)
Import the component and start using the <ux-datatable> tag.

HTML

<!DOCTYPE html>
<html>
<head>
    <title>UX Data Table Demo</title>
    <script type="module" src="node_modules/ux-datatable-component/dist/uxDataTable.js"></script> 
</head>
<body>

    <ux-datatable id="my-table"></ux-datatable>

    <script type="module">
        const table = document.getElementById('my-table');

        table.columns = [
            { key: 'name', label: 'Item Name' },
            { key: 'status', label: 'Status', width: '20%' }
        ];

        table.data = [
            { id: 1, name: 'Initial Setup', status: 'Completed', children: [
                { id: 1.1, name: '— Subtask A', status: 'Completed' }
            ]},
            { id: 2, name: 'Database Migration', status: 'Pending' }
        ];

        // Example: Handle a row click event
        table.onRowClick = (row) => {
            console.log('Row Clicked:', row);
        };
    </script>
</body>
</html>
✨ Features and API Properties
The component offers several public properties for configuration.

Property	Type	Default	Description
columns	TableColumn[]	[]	Defines the columns (key, label, width, type).
data	TableRow[]	[]	The array of data objects to display.
emptyDataText	string	'No hay datos disponibles.'	Text shown when the data array is empty.
showExpanderIcon	boolean	true	Toggles the visibility of the expansion icon column.
expanderIconPosition	'first' | 'last'	'first'	Position of the expansion icon column.
expanderIconContent	string	'▶'	Custom content for the icon (e.g., +, 🌳, or an <i> tag).

Exportar a Hojas de cálculo
Data Structure (types.ts)
For reference, the data structure requires an id and supports nested data via the children array:

TypeScript

interface TableColumn {
    key: string;       
    label: string;     
    width?: string;    
    type?: 'string' | 'number' | 'image' | 'date'; 
}

interface TableRow {
    id: string | number;
    [key: string]: any;
    children?: TableRow[]; 
}
⚡ Events (Interactivity)
The table exposes custom properties to handle user interaction.

Property	Signature	Description
onRowClick	(row: TableRow) => void	Fired when any non-expandable row is clicked.
onRowMouseEnter	(row: TableRow) => void	Fired when the mouse enters a row.
onRowMouseLeave	(row: TableRow) => void	Fired when the mouse leaves a row.
onCellClick	(data: { row, column, value }) => void	Fired when a specific cell is clicked.

Exportar a Hojas de cálculo
Implementing Row Selection (tr.selected)
The component includes a visual CSS class .selected. To implement single or multi-row selection, you must listen to the onRowClick event and use native JavaScript (e.g., element.classList.add('selected')) to apply the class to the row's DOM element.

🎨 Customization (CSS Variables)
The entire look and feel of the table can be customized by setting CSS variables on the <ux-datatable> element.

Variable	Default Value	Description
--lovely-dt-border-color	#ddd	Border color for cells and header.
--lovely-dt-row-bg-odd	#fff	Background color for odd rows.
--lovely-dt-row-bg-even	#f9f9f9	Background color for even rows.
--lovely-dt-row-bg-child	#fafafa	Background color for nested (child) rows.
--lovely-dt-row-font-family	inherit	Font family for table cells.
--lovely-dt-row-bg-hover	#e0f0ff	Background color on row hover.
--lovely-dt-text-color-hover	#000	Text color on row hover (crucial for contrast).
--lovely-dt-expander-icon-color	#000	Color of the expansion icon.

Exportar a Hojas de cálculo
Example of Styling
CSS

ux-datatable {
    /* Custom Theme: Dark and Bright Hover */
    --lovely-dt-border-color: #61dafb;
    --lovely-dt-row-bg-odd: #282c34;
    --lovely-dt-row-bg-even: #3e4451;
    
    /* Hover Effect */
    --lovely-dt-row-bg-hover: #ffcc00; /* Bright Yellow */
    --lovely-dt-text-color-hover: #000; /* Black text for high contrast */
    
    /* Apply global text color for Dark Mode */
    color: #f0f0f0;
}
📱 Responsiveness
The table is designed to be highly responsive:

Horizontal Scrolling: On narrow screens (mobile devices), the component automatically enables horizontal scrolling (overflow-x: auto) if the content width exceeds the viewport width.

Accessible Width: The table uses an accessible minimum width (min-width: 37.5em) to ensure all content remains legible, scaling relative to the users font size settings for improved accessibility.

🤝 Contributing
Feedback and contributions are welcome!