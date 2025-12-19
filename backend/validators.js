function validateRow(row) {
    if (!row.name || row.name.trim() === "")
        return "Name missing";
    if (!row.price || isNaN(row.price) || Number(row.price) <= 0)
        return "Invalid price";
    if (!row.quantity || !Number.isInteger(Number(row.quantity)))
        return "Invalid quantity";
    return null;
}
module.exports = validateRow;
