import { useState } from "react";

function App() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [search, setSearch] = useState("");

    function uploadCSV() {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setResult(data);
            });
    }

    const filteredAccepted =
        result?.accepted.filter(r =>
            r.name?.toLowerCase().includes(search.toLowerCase())
        ) || [];

    return (
        <div style={{ padding: 20 }}>
            <h2>CSV Validator</h2>

            <input
                type="file"
                accept=".csv"
                onChange={e => setFile(e.target.files[0])}
            />

            <button onClick={uploadCSV} disabled={!file}>
                Upload
            </button>

            {result && (
                <>
                    <h3>Metrics</h3>
                    <p>Total: {result.metrics.total}</p>
                    <p>Accepted: {result.metrics.accepted}</p>
                    <p>Rejected: {result.metrics.rejected}</p>

                    <h3>Search Accepted Items</h3>
                    <input
                        placeholder="Search by name"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <h3>Accepted Items</h3>
                    {filteredAccepted.length === 0 && <p>No accepted records</p>}

                    {filteredAccepted.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredAccepted.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.name}</td>
                                    <td>{r.price}</td>
                                    <td>{r.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}

                    <h3>Rejected Items</h3>
                    {result.rejected.length === 0 && <p>No rejected records</p>}

                    {result.rejected.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Row</th>
                                <th>Reason</th>
                            </tr>
                            </thead>
                            <tbody>
                            {result.rejected.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.rowNumber}</td>
                                    <td>{r.reason}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
