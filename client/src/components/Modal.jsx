import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState(""); // State to store the input address
  const [accessList, setAccessList] = useState([]); // State to store the list of addresses with access

  const sharing = async () => {
    if (!address || !address.trim()) {
      alert("Please enter a valid address!");
      return;
    }
    try {
      await contract.allowAccess(address); // Call the smart contract function to allow access
      alert(`Access granted to ${address}`);
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("An error occurred while sharing access. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      try {
        const addressList = await contract.shareAccess(); // Fetch the list of addresses with access
        setAccessList(addressList); // Update the state with the fetched list
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };
    if (contract) {
      fetchAccessList();
    }
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share Access</div>
        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Update state on input change
          />
        </div>
        <div className="access-list">
          <h4>People With Access:</h4>
          <ul>
            {accessList.length > 0 ? (
              accessList.map((item, index) => (
                <li key={index}>{item.user}</li>
              ))
            ) : (
              <li>No one has access yet.</li>
            )}
          </ul>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={sharing}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;