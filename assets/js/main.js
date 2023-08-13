// Load Google Charts and set callback function
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart(dataArray) {
  const selectedColumnIndex = 0; // Change this to the desired column index
  const chartData = [["Label", "Value"]];
  dataArray.forEach((row) => {
    chartData.push([
      row[selectedColumnIndex],
      parseFloat(row[selectedColumnIndex]),
    ]);
  });

  const data = google.visualization.arrayToDataTable(chartData);

  const options = {
    title: "Chart Title",
  };

  const chart = new google.visualization.ColumnChart(
    document.getElementById("chart-container")
  );
  chart.draw(data, options);
}

function validateForm() {
  const fileInput = document.querySelector('input[name="csvfile"]');
  const fileName = fileInput.value;
  const allowedExtensions = /(\.csv)$/i;

  if (!allowedExtensions.exec(fileName)) {
    alert("Please upload a valid CSV file.");
    return false;
  }

  return true;
}

function searchTable() {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.querySelector(".data-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows and columns, hide those that don't match the search query
  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function sortTable(column, descending = false) {
  const table = document.querySelector(".data-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const cellA = a.querySelector(
      `td:nth-child(${tableHeaders.indexOf(column) + 1})`
    ).textContent;
    const cellB = b.querySelector(
      `td:nth-child(${tableHeaders.indexOf(column) + 1})`
    ).textContent;
    if (!isNaN(cellA) && !isNaN(cellB)) {
      return descending ? cellB - cellA : cellA - cellB;
    }
    return descending ? cellB.localeCompare(cellA) : cellA.localeCompare(cellB);
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}
