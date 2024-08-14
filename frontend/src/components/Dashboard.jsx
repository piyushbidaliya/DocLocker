import React, { useState, useRef, useEffect } from "react";
import logout from '../assets/logout.svg';
import { doSignOut } from '../firebase/auth';
import { NavLink } from 'react-router-dom';
import { getDownloadURL, listAll, uploadBytes, ref, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase/firebase";

const Dashboard = () => {
  const [docUpload, setDocUpload] = useState(null);
  const [docList, setDocList] = useState([]);
  const [email, setEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const fileInputRef = useRef(null);

  const docListRef = ref(storage, "documents/");

  const handleFileUpload = (event) => {
    setDocUpload(event.target.files[0]);
  };

  const uploadDocument = () => {
    if (docUpload == null) return;
    const newFileName = `${uuidv4()}_${docUpload.name}`;
    const docRef = ref(storage, `documents/${newFileName}`);
    uploadBytes(docRef, docUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDocList((prev) => [...prev, { name: docUpload.name, url, fullPath: docRef.fullPath }]);
      });
    });
  };

  useEffect(() => {
    listAll(docListRef).then((response) => {
      const fetchDocs = response.items.map((item) =>
        getDownloadURL(item).then((url) => ({
          name: item.name.split('_')[1], // Extract original file name
          url,
          fullPath: item.fullPath,
        }))
      );
      Promise.all(fetchDocs).then((docs) => {
        setDocList(docs);
      });
    });
  }, []);

  const initiateShareDocument = (document) => {
    setCurrentDocument(document);
    setIsSharing(true);
  };

  const shareDocument = () => {
    if (email && currentDocument) {
      alert(`Sharing ${currentDocument.name} with ${email}`);
      setEmail('');
      setIsSharing(false);
      setCurrentDocument(null);
      // In a real app, you'd send the document to the email here.
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const deleteDocument = (index) => {
    const docToDelete = docList[index];
    const docRef = ref(storage, docToDelete.fullPath);
    
    deleteObject(docRef).then(() => {
      setDocList((prev) => prev.filter((_, i) => i !== index));
    }).catch((error) => {
      console.error("Error deleting document:", error);
    });
  };

  return (
    <section className="w-screen h-screen">
      <div className='bg-blue-200 p-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <NavLink onClick={() => { doSignOut() }} to={'/'} className={"medium-15 border border-blue-500 bg-blue-500 px-7 py-3 text-white transition-all hover:bg-blue-500 rounded-full flex justify-center gap-x-2 medium-16"}> 
          <img src={logout} alt="logouticon" height={19} width={19}/> Logout 
        </NavLink>
      </div>
      <div className="m-4 flex justify-center items-center">
        <input 
          type="file" 
          onChange={handleFileUpload} 
          className="mr-2" 
          ref={fileInputRef}
        />
        <button onClick={uploadDocument} className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>

      <ul className="list-disc">
        {docList.map((doc, index) => (
          <li key={index} className="flex justify-between items-center mb-2 mx-6">
            <span>{doc.name}</span>
            <div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
              >
                Download
              </a>
              <button
                onClick={() => initiateShareDocument(doc)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Share
              </button>
              <button
                onClick={() => deleteDocument(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isSharing && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Share Document</h2>
          <p>Enter the email address to share <strong>{currentDocument.name}</strong>:</p>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border border-gray-300 p-2 mr-2 w-full mt-2"
          />
          <button
            onClick={shareDocument}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Send
          </button>
          <button
            onClick={() => setIsSharing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
