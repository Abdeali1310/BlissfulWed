import { useEffect, useState } from "react";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/packages")
            .then((res) => res.json())
            .then((data) => setPackages(data))
            .catch((err) => console.error("Error fetching packages:", err));
    }, []);

    return (
        <div>
            <h2>Wedding Packages</h2>
            <div className="package-list">
                {packages.map((pkg) => (
                    <div key={pkg._id} className="package-card">
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description}</p>
                        <p>Price: ${pkg.price}</p>
                        <a href={`/packages/${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}>View Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;