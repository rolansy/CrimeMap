import React, { useState } from "react";

const CaseManagement = () => {
  const [caseDetails, setCaseDetails] = useState({
    matter: ""
  });

  const handleChange = (e) => {
    setCaseDetails({ ...caseDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Case Details Submitted:", caseDetails);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Case Management System</h2>
      
      {/* Case Details */}
     
      
      <div className="grid grid-cols-2 gap-4 w-full h-3/4">
        {/* Evidence Storage Button */}
        <button 
          className="h-full w-full bg-Black-700 text-white text-2xl font-bold rounded-lg hover:bg-green-300">
          Evidence Storage
        </button>
        
        {/* Case Board Button */}
        <button
  className="h-full w-full text-white text-2xl font-bold rounded-lg hover:bg-green-300"
  style={{
    backgroundImage: "url('/images/es.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  Evidence Storage
</button>
      </div>
    </div>
  );
};

export default CaseManagement;
