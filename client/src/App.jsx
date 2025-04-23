import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import Header from "./components/header";

import "./App.css";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal"; // Import the Modal component

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new BrowserProvider(window.ethereum);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new Contract(contractAddress, Upload.abi, signer);
          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    };

    initializeProvider();
  }, []);

  return (
    <div className="app">
    <Header account={account} /> {/* Header Component */}

      {/* File Upload Component */}
      <FileUpload account={account} provider={provider} contract={contract} />

      {/* Display Component */}
      <Display account={account} contract={contract} />

      {/* Share Access Button */}
      <button className="share-button" onClick={() => setModalOpen(true)}>
        Share Access
      </button>

      {/* Modal Component */}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract} />
      )}
    </div>
  );
}

export default App;
