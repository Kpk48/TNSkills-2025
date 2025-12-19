const items = [];
let lock = false;
async function acquireLock() {
    while (lock) {
        await new Promise(r => setTimeout(r, 1));
    }
    lock = true;
}
function releaseLock() {
    lock = false;
}
async function addItems(newItems) {
    await acquireLock();
    items.push(...newItems);
    releaseLock();
}
async function searchItems(query) {
    await acquireLock();
    const result = items.filter(i =>
        i.name.toLowerCase().includes(query.toLowerCase())
    );
    releaseLock();
    return result;
}
module.exports = { addItems, searchItems };
