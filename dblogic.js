function fetchSelectedTable() {
    const tableName = document.getElementById('table-select').value;
    const outputDiv = document.getElementById('output');

    outputDiv.innerHTML = "<p>Loading data...</p>";

    fetch(`api.php?table=${tableName}`)
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    })
    .then(response => {
        if (response.status !== "success") {
            outputDiv.innerHTML = `<p style="color:red;">Error: ${response.message}</p>`;
            return;
        }

        const data = response.data;

        // Safety check: If the table is completely empty in MySQL
        if (data.length === 0) {
            outputDiv.innerHTML = `<p>The table <strong>${tableName}</strong> is empty.</p>`;
            return;
        }

        // 1. Create the table element
        let table = document.createElement('table');
        table.setAttribute('border', '1'); // Optional basic styling border
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginTop = '20px';

        // 2. Generate the Table Header (TH) dynamically using the object keys
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        
        // Get column names from the first item in the array
        let columns = Object.keys(data[0]); 
        
        columns.forEach(columnName => {
            let th = document.createElement('th');
            th.textContent = columnName.toUpperCase(); // Capitalize headers
            th.style.padding = '10px';
            th.style.background = '#f2f2f2';
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 3. Generate Table Body Rows (TD)
        let tbody = document.createElement('tbody');
        data.forEach(row => {
            let tr = document.createElement('tr');
            
            columns.forEach(columnName => {
                let td = document.createElement('td');
                td.textContent = row[columnName]; // Extract data matching the column
                td.style.padding = '8px';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        // 4. Clear the output div and inject the completed table
        outputDiv.innerHTML = "";
        outputDiv.appendChild(table);
    })
    .catch(err => {
        console.error("Fetch error:", err);
        outputDiv.innerHTML = `<p style="color:red;">Fetch Error: ${err.message}</p>`;
    });
}