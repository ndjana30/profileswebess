import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import '../App.css';
export default function Admin() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [turning,setTurning] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

const postFiles = async () => {
  setTurning(true);
  const formData = new FormData();
  selectedFiles.forEach((file, index) => {
    formData.append(`file`, file);
  });

  await axios.post("https://profilacademiqueess.onrender.com/api/v1/files/add/many", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(function(response) {
    console.log(response.data);
    setTurning(false);
  })
  .catch(function(error) {
    console.log(error);
  });
};


  return (
    <div className="admin">
      <input type="file" name='file'  multiple onChange={handleFileChange} />
      <ul>
      {turning? <div className="App"> 
<Spin size="large" />
</div>: 
        Array.from(selectedFiles).map((file, index) => (
          
          <li key={index}>{file.name}</li>
          
        ))}
      </ul>
      {
        selectedFiles.length === 0 ? <span>No files yet</span>:
      <button onClick={()=>{postFiles()}}> Send Profiles
      </button>
}
    </div>
  );
}
