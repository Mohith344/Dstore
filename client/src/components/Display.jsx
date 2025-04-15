import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState(""); // State to store image elements
  const [loading, setLoading] = useState(false); // State to show loading indicator

  const getData = async () => {
    setLoading(true); // Show loading indicator
    let dataArray;
    const otherAddress = document.querySelector(".address").value;

    try {
      // Fetch data from the smart contract
      if (otherAddress) {
        dataArray = await contract.displayImages(otherAddress);
        console.log("Data for other address:", dataArray);
      } else {
        dataArray = await contract.displayImages(account);
        console.log("Data for connected account:", dataArray);
      }

      // Check if data is empty
      if (dataArray.length === 0) {
        alert("No images to display");
        setData("");
      } else {
        // Convert the data array into image elements
        const images = dataArray.map((item, i) => (
          <a href={`https://gateway.pinata.cloud/ipfs/${item}`} key={i} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${item}`}
              alt={`Uploaded file ${i + 1}`}
              className="image-list"
            />
          </a>
        ));
        setData(images);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("You don't have access or an error occurred.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="display-container">
      <h2>View Uploaded Files</h2>
      <input
        type="text"
        placeholder="Enter Address (optional)"
        className="address"
      />
      <button className="center button" onClick={getData}>
        {loading ? "Loading..." : "Get Data"}
      </button>
      <div className="image-list">{data}</div>
    </div>
  );
};

export default Display;