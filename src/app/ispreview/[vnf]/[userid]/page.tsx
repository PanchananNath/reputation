"use client";
import { useState } from 'react';

const ISPReviewForm = (props: {
    params: { vnf: string, userid: string };
}) => {
  const [formData, setFormData] = useState({
    vnfid: '',
    userid: '',
    success: '',
    processormatched: '',
    memorymatched: '',
    storagematched: '',
    bandwidthmatched: '',
    securitymatched: '',
    throughput: '',
    latency: '',
    score: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
        const body = {
            vnfid: props.params.vnf,
            userid: props.params.userid,
            success: formData.success,
            processormatched: formData.processormatched,
            memorymatched: formData.memorymatched,
            storagematched: formData.storagematched,
            bandwidthmatched: formData.bandwidthmatched,
            securitymatched: formData.securitymatched,
            throughput: formData.throughput,
            latency: formData.latency,
            score: formData.score
        };

        
      const response = await fetch('/api/addispreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
      window.location.href = '/'; // Redirect to home page after successful sign in
      } else {
        const data = await response.json();
        console.error(data);
        // Handle error response
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-md">
    <h1 className="text-2xl font-semibold mb-4">ISP Review Form</h1>
    <form onSubmit={handleSubmit}>
    
     
      <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Success:</label>
          <select name="success" value={formData.success} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select success </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Processor Matched:</label>
          <select name="processormatched" value={formData.processormatched} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select Processor Matched</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Memory Matched:</label>
          <select name="memorymatched" value={formData.memorymatched} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select Memory Matched</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Storage Matched:</label>
          <select name="storagematched" value={formData.storagematched} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select Storage Matched</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Bandwidth Matched:</label>
          <select name="bandwidthmatched" value={formData.bandwidthmatched} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select Bandwidth Matched</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Security Matched:</label>
          <select name="securitymatched" value={formData.securitymatched} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400">
            <option value="">Select Security Matched</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Throughput:</label>
        <input type="text" name="throughput" value={formData.throughput} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Latency:</label>
        <input type="text" name="latency" value={formData.latency} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Score:</label>
        <input type="text" name="score" value={formData.score} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  </div>
  );
};

export default ISPReviewForm;
