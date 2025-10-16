# UX Data Table Web Component

A highly customizable, responsive, and accessible data table **Web Component** built with **Lit** and **TypeScript**. This component is designed to handle modern web applications, supporting features like **hierarchical data** (expandable rows) and extensive **CSS variable customization**, including sophisticated hover effects.

[![npm version](https://badge.fury.io/js/lovely-datatable.svg)](https://www.npmjs.com/package/lovely-datatable)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 📦 Installation

Install the component using npm. This package includes the compiled JavaScript required for any web project.

```bash
npm install lovely-datatable


 ##🚀 Usage
You can use the <lovely-datatable> component in any standard HTML, JavaScript, or framework-based project.

Basic Setup (Plain HTML/JavaScript)
Import the component and then set the columns and data properties on the element.

HTML

<!DOCTYPE html>
<html>
<head>
    <title>UX Data Table Demo</title>
    <script type="module" src="node_modules/lovely-datatable-component/dist/uxDataTable.js"></script> 
</head>
<body>

    <lovely-datatable id="my-table"></lovely-datatable>

    <script type="module">
        const table = document.getElementById('my-table');

        // 1. Define the columns
        table.columns = [
            { key: 'name', label: 'Item Name' },
            { key: 'status', label: 'Status', width: '20%' }
        ];

        // 2. Load the data (supports nested children array for hierarchy)
        table.data = [
            { id: 1, name: 'Initial Setup', status: 'Completed', children: [
                { id: 1.1, name: '— Subtask A', status: 'Completed' }
            ]},
            { id: 2, name: 'Database Migration', status: 'Pending' }
        ];

        // 3. Handle an interactive event
        table.onRowClick = (row) => {
            console.log('Row Clicked:', row);
        };
    </script>
</body>
</html>

 ## ✨ API and Properties
The component offers a set of public properties and event handlers for configuration and interactivity.

Configuration Properties
Property	Type	Default	Description
columns	TableColumn[]	[]	Defines the table structure (key, label, width, type).
data	TableRow[]	[]	The array of data objects to display.
emptyDataText	string	'No hay datos disponibles.'	Text shown when the data array is empty.
showExpanderIcon	boolean	true	Toggles the visibility of the expansion icon column.
expanderIconPosition	'first' | 'last'	'first'	Position of the expansion icon column.
expanderIconContent	string	'▶'	Custom content for the icon (e.g., +, 🌳, or an <i> tag).

Exportar a Hojas de cálculo
Data Structure (types.ts)
The data expects a unique id for each row and uses the optional children array to define the row hierarchy.

TypeScript

interface TableColumn {
    key: string;       // Property key in the data object
    label: string;     // Column header text
    width?: string;    // CSS width (e.g., '100px', '20%')
    type?: 'string' | 'number' | 'image' | 'date'; 
}

interface TableRow {
    id: string | number;
    [key: string]: any; // Allows any custom data properties
    children?: TableRow[]; // For nested/hierarchical data
}
##⚡ Interactivity and Events
Custom properties are exposed to handle user interactions directly on the element.

Property	Signature	Description
onRowClick	(row: TableRow) => void	Fired when any non-expandable row is clicked.
onCellClick	(data: { row, column, value }) => void	Fired when a specific cell is clicked.
onRowMouseEnter	(row: TableRow) => void	Fired when the mouse enters a row.
onRowMouseLeave	(row: TableRow) => void	Fired when the mouse leaves a row.

Exportar a Hojas de cálculo
💡 Implementing Row Selection: To visually mark a row as selected, listen to the onRowClick event and use native DOM manipulation (e.g., element.classList.add('selected')) to apply the component's built-in .selected CSS class to the row's DOM element.

## 🎨 Customization (CSS Variables)
The table's look and feel can be entirely customized by setting CSS variables on the <lovely-datatable> element.

Variable	Default Value	Description
--lovely-dt-border-color	#ddd	Border color for cells and header.
--lovely-dt-row-bg-odd	#fff	Background color for odd rows.
--lovely-dt-row-bg-even	#f9f9f9	Background color for even rows.
--lovely-dt-row-bg-child	#fafafa	Background color for nested (child) rows.
--lovely-dt-row-bg-hover	#e0f0ff	Background color on row hover.
--lovely-dt-text-color-hover	#000	Text color on row hover (crucial for contrast).
--lovely-dt-row-font-family	inherit	Font family for table cells.
--lovely-dt-expander-icon-color	#000	Color of the expansion icon.

Exportar a Hojas de cálculo
Example of Styling
CSS

lovely-datatable {
    /* Custom Theme: Dark and Bright Hover */
    --lovely-dt-border-color: #61dafb;
    --lovely-dt-row-bg-odd: #282c34;
    --lovely-dt-row-bg-even: #3e4451;
    
    /* Apply global text color for Dark Mode */
    color: #f0f0f0;

    /* Hover Effect */
    --lovely-dt-row-bg-hover: #ffcc00; /* Bright Yellow */
    --lovely-dt-text-color-hover: #000; /* Black text for high contrast */
}

## 📱 Responsiveness
The table is designed for maximum accessibility and responsiveness across devices:

Horizontal Scrolling: On narrow viewports (e.g., mobile devices), the table automatically enables horizontal scrolling (overflow-x: auto) if the content exceeds the screen width.

Accessible Width: The table maintains an accessible minimum width (min-width: 37.5em), ensuring content remains legible and scales relative to the user's font size settings.

## 🤝 Contributing
Feedback, bug reports, and contributions are welcome! Please check the repository for details on how to get involved.