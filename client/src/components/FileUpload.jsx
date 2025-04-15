import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [files, setFiles] = useState([]); // State to store multiple files
  const [fileNames, setFileNames] = useState([]); // State to store file names

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please choose at least one file!");
      return;
    }

    try {
      console.log("Uploading files to Pinata...");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = fileNames[i];

        const formData = new FormData();
        formData.append("file", file);

        // Add metadata (optional)
        const metadata = JSON.stringify({
          name: fileName,
          keyvalues: {
            uploadedBy: account,
          },
        });
        formData.append("pinataMetadata", metadata);

        // Add pinata options (optional)
        const options = JSON.stringify({
          cidVersion: 1,
        });
        formData.append("pinataOptions", options);

        // Pinata API request
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "3b452f5a8eb99672aacd", // Replace with your Pinata API Key
            pinata_secret_api_key: "6fa294d3d499cbe74bc1160b2d48b87f4137b4980a66e2166d845b5299188a29", // Replace with your Pinata Secret Key
          },
        });

        console.log(`File ${fileName} uploaded successfully:`, res.data);
        alert(`File ${fileName} uploaded successfully! IPFS Hash: ${res.data.IpfsHash}`);

        // Store the IPFS hash on the blockchain
        const ipfsHash = res.data.IpfsHash;
        if (contract) {
          const tx = await contract.addUser(account, ipfsHash);
          await tx.wait();
          console.log(`IPFS hash for ${fileName} stored on blockchain:`, ipfsHash);
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading the files. Please try again.");
    }
  };

  const retrieveFiles = (e) => {
    const data = Array.from(e.target.files); // Get the selected files as an array
    if (data.length > 0) {
      setFiles(data);
      setFileNames(data.map((file) => file.name)); // Store file names
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Your Files</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Files
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          multiple // Allow multiple file selection
          onChange={retrieveFiles}
        />
        <div className="file-names">
          {fileNames.length > 0
            ? fileNames.map((name, index) => <p key={index}>{name}</p>)
            : "No files chosen"}
        </div>
        <button type="submit" className="upload" disabled={files.length === 0}>
          Upload Files
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
