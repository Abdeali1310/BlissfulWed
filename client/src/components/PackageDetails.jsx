import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PackageDetails = () => {
    const { packageName } = useParams();
    const [packageData, setPackageData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/packages/${packageName}`)
            .then((res) => res.json())
            .then((data) => setPackageData(data))
            .catch((err) => console.error("Error fetching package:", err));
    }, [packageName]);

    if (!packageData) return <p>Loading...</p>;

    return (
        <div>
            <h2>{packageData.name}</h2>
            <p>{packageData.description}</p>
            <p>Price: ${packageData.price}</p>
            <ul>
                {packageData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <a href="/">Back to Packages</a>
        </div>
    );
};

export default PackageDetails;