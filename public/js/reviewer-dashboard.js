function filterPapers(status) {
    // Get all rows in the table
    var rows = document.querySelectorAll("#table-container tbody tr");

    // Show or hide rows based on the selected filter
    rows.forEach(function(row) {
        if (status === "all" || row.getAttribute("data-status") === status) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    // Highlight the active filter button
    var options = document.querySelectorAll(".filter-dropdown");
    options.forEach(function(option) {
        if (option.value === status) {
            option.setAttribute("selected", "selected");
        } else {
            option.removeAttribute("selected");
        }
    });
}