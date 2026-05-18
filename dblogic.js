function fetchSelectedTable() {
    const tableName = document.getElementById('table-select').value;

    // Pass the selected table name as a GET parameter (?table=...)
    fetch(`api.php?table=${tableName}`)
    .then(res => res.json())
    .then(response => {
        const outputDiv = document.getElementById('output');
        
        if(response.status === "success") {
            // Display your data (e.g., printing it as raw JSON or building a dynamic table)
            outputDiv.innerHTML = `<pre>${JSON.stringify(response.data, null, 2)}</pre>`;
        } else {
            outputDiv.innerHTML = `<p style="color:red;">Error: ${response.message}</p>`;
        }
    })
    .catch(err => console.error("Fetch error:", err));
}