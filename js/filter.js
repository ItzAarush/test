function sortTable(columnIndex) {
    const table = document.getElementById("data-table");
    const rows = Array.from(table.rows).slice(1);
    const isNumeric = !isNaN(parseFloat(rows[0].cells[columnIndex].innerText.replace(/[%,-]/g, '')));
    const direction = table.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
    table.setAttribute("data-sort-dir", direction);

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText.replace(/[%,-]/g, '');
        const bText = b.cells[columnIndex].innerText.replace(/[%,-]/g, '');
        return isNumeric
            ? direction === "asc"
                ? parseFloat(aText) - parseFloat(bText)
                : parseFloat(bText) - parseFloat(aText)
            : direction === "asc"
                ? aText.localeCompare(bText)
                : bText.localeCompare(aText);
    });

    rows.forEach(row => table.querySelector("tbody").appendChild(row));
}