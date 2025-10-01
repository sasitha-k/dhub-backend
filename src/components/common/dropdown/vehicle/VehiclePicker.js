import React from 'react'
import { SearchableDropDown } from '../SearchableDropDown'

export default function VehiclePicker() {
    const data = [
    {
      value: "DRV0001",
      label: "Vehicle 01",
      mobile: "0771234567",
      email: "kamal@example.com",
      vehicleNumber: "ABC-1234",
      vehicleType: "Sedan"
    },
    {
      value: "DRV0002",
      label: "Vehicle 02",
      mobile: "0769876543",
      email: "nimal@example.com",
      vehicleNumber: "XYZ-5678",
      vehicleType: "SUV"
    },
    {
      value: "DRV0003",
      label: "Vehicle 03",
      mobile: "0752345678",
      email: "sunil@example.com",
      vehicleNumber: "DEF-9012",
      vehicleType: "Van"
    },
    {
      value: "DRV0004",
      label: "Vehicle 04",
      mobile: "0748765432",
      email: "ranjith@example.com",
      vehicleNumber: "GHI-3456",
      vehicleType: "Luxury"
    },
    {
      value: "DRV0005",
      label: "Vehicle 05",
      mobile: "0734567890",
      email: "ajith@example.com",
      vehicleNumber: "JKL-7890",
      vehicleType: "Sedan"
    },
    {
      value: "DRV0006",
      label: "Vehicle 06",
      mobile: "0723456789",
      email: "dilshan@example.com",
      vehicleNumber: "MNO-1234",
      vehicleType: "SUV"
    },
    {
      value: "DRV0007",
      label: "Vehicle 07",
      mobile: "0712345678",
      email: "prasanna@example.com",
      vehicleNumber: "PQR-5678",
      vehicleType: "Van"
    },
    
  ]
  return (
      <SearchableDropDown data={data} placeholder={"Select vehicle"}/>
  )
}
