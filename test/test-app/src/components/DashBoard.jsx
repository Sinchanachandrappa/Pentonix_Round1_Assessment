import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  let [filterdata, setFilterData] = useState(data);
  let [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const { username } = useParams();
  const usersdata = data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieving data from localStorage
        const value = localStorage.getItem(username);
        console.log(value); // Output: 'value'

        const response = await axios.get("http://localhost:5000/api/data", {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        });
        setData(response.data.usersdata);
        setFilter(response.data.usersdata);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    console.log(filter, search);
    let fdata = data.filter(fdata => {
      if (filter == "id" && fdata.id == search) {
        console.log(fdata, "id f");
        return fdata;
      } else if (filter == "username" && fdata.username == search) {
        console.log(fdata, "username f");

        return fdata;
      } else if (filter == "email" && fdata.email == search) {
        console.log(fdata, "email f");

        return fdata;
      }
    });
    console.log(fdata);
    if (fdata.length > 0) {
      setFilterData(fdata);
    } else {
      setFilterData(data);
    }
  }, [search]);

  // Filter data based on filter and search criteria
  console.log(filterdata);
  return (
    <div className="dashboard-container">
      {/* Navbar with profile icon */}
      <div className="navbar">{/* Profile icon and username */}</div>
      <div className="filters">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">Select Filter</option>
          <option value="id">id </option>
          <option value="username">username </option>
          <option value="email">email </option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Table to display data */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more table headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {filterdata.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              {/* Add more table data based on your data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
