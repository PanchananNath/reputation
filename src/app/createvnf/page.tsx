"use client";
import { useData } from "@/providers/dataprovider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddVNFPage() {
  const { user } = useData();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    vendorid: "",
    hash: "",
    reputationscore: "",
    processor: "",
    memory: "",
    storage: "",
    bandwidth: "",
    security: "",
    filepath: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("/api/addvnf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/vendor"); // Redirect to VNF list page after successful submission
      } else {
        console.error("Failed to add VNF");
      }
    } catch (error) {
      console.error("Failed to add VNF", error);
    }
  };

  return (
    <div className="px-44 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Add New VNF</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="vendorid">
            Vendor:
          </label>
          <input
            type="text"
            name="vendorid"
            id="vendorid"
            value={formData.vendorid}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="processor">
            Processor:
          </label>
          <input
            type="text"
            name="processor"
            id="processor"
            value={formData.processor}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="memory">
            Memory:
          </label>
          <input
            type="text"
            name="memory"
            id="memory"
            value={formData.memory}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="storage">
            Storage:
          </label>
          <input
            type="text"
            name="storage"
            id="storage"
            value={formData.storage}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="bandwidth">
            Bandwidth:
          </label>
          <input
            type="text"
            name="bandwidth"
            id="bandwidth"
            value={formData.bandwidth}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="security">
            Security:
          </label>
          <input
            type="text"
            name="security"
            id="security"
            value={formData.security}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1" htmlFor="security">
            VNF:
          </label>
          <input
            type="file"
            name="vnffile"
            id="vnffile"
            // onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add VNF
        </button>
      </form>
    </div>
  );
}
