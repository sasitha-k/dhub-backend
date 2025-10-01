import React from 'react'
import { SearchableDropDown } from '../SearchableDropDown'

export default function RiderPicker() {
    const data = [
    {
      value: "DRV0001",
      label: "Kamal Perera",
      mobile: "0771234567",
      email: "kamal@example.com",
      vehicleNumber: "ABC-1234",
      vehicleType: "Sedan"
    },
    {
      value: "DRV0002",
      label: "Nimal Silva",
      mobile: "0769876543",
      email: "nimal@example.com",
      vehicleNumber: "XYZ-5678",
      vehicleType: "SUV"
    },
    {
      value: "DRV0003",
      label: "Sunil Fernando",
      mobile: "0752345678",
      email: "sunil@example.com",
      vehicleNumber: "DEF-9012",
      vehicleType: "Van"
    },
    {
      value: "DRV0004",
      label: "Ranjith Bandara",
      mobile: "0748765432",
      email: "ranjith@example.com",
      vehicleNumber: "GHI-3456",
      vehicleType: "Luxury"
    },
    {
      value: "DRV0005",
      label: "Ajith Wijesinghe",
      mobile: "0734567890",
      email: "ajith@example.com",
      vehicleNumber: "JKL-7890",
      vehicleType: "Sedan"
    },
    {
      value: "DRV0006",
      label: "Dilshan Kumar",
      mobile: "0723456789",
      email: "dilshan@example.com",
      vehicleNumber: "MNO-1234",
      vehicleType: "SUV"
    },
    {
      value: "DRV0007",
      label: "Prasanna Jayasuriya",
      mobile: "0712345678",
      email: "prasanna@example.com",
      vehicleNumber: "PQR-5678",
      vehicleType: "Van"
    },
    {
      value: "DRV0008",
      label: "Sampath Raj",
      mobile: "0709876543",
      email: "sampath@example.com",
      vehicleNumber: "STU-9012",
      vehicleType: "Luxury"
    },
    {
      value: "DRV0009",
      label: "Lakmal Devi",
      mobile: "0698765432",
      email: "lakmal@example.com",
      vehicleNumber: "VWX-3456",
      vehicleType: "Sedan"
    },
    {
      value: "DRV0010",
      label: "Tharindu Mendis",
      mobile: "0687654321",
      email: "tharindu@example.com",
      vehicleNumber: "YZA-7890",
      vehicleType: "SUV"
    }
  ]
  return (
      <SearchableDropDown data={data} placeholder={"Select rider"}/>
  )
}
