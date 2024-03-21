"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Transaktioner() {
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Transaktionsdata
  const transactionData = [
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
      VAT: "5%", // Lägg till VAT-information för varje transaktion
      attachment: "invoice001.pdf" // Lägg till filbilagor för varje transaktion
    },
    {
      invoice: "INV002",
      status: "Pending",
      method: "PayPal",
      amount: "$150.00",
      VAT: "10%", // Lägg till VAT-information för varje transaktion
      attachment: "invoice002.pdf" // Lägg till filbilagor för varje transaktion
    },
    {
      invoice: "INV003",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$300.00",
      VAT: "5%", // Lägg till VAT-information för varje transaktion
      attachment: "invoice003.pdf" // Lägg till filbilagor för varje transaktion
    },
    {
      invoice: "INV004",
      status: "Pending",
      method: "Credit Card",
      amount: "$200.00",
      VAT: "15%", // Lägg till VAT-information för varje transaktion
      attachment: "invoice004.pdf" // Lägg till filbilagor för varje transaktion
    },
  ]  
const handleAttachmentChange = (e) => {
    console.log(e)
}
const handleCategoryChange  = () => {

}
const handleVATChange  = () => {
    
}
  // Funktion för att hantera klick på en tablerad
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mappa transaktionsdata till TableRow-element */}
          {transactionData.map((transaction, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(transaction)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">
                {transaction.invoice}
              </TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>{transaction.method}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
        <CardDescription>Invoice and Transaction Details</CardDescription>
      </CardHeader>
      <CardContent>
  {/* Rendera datan från den valda tableraden */}
  {selectedRowData && (
    <>
      <p>Invoice: {selectedRowData.invoice}</p>
      <p>Status: {selectedRowData.status}</p>
      <p>Method: {selectedRowData.method}</p>
      <p>Amount: {selectedRowData.amount}</p>
      <div className="mb-4">
        <Label htmlFor="category">Category:</Label>
        <Select value={selectedRowData.VAT} onChange={handleCategoryChange} className="w-full">
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="vat">VAT:</Label>
        <Select value={selectedRowData.VAT} onChange={handleVATChange} className="w-full">
          <SelectTrigger>
            <SelectValue placeholder="Select VAT" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>VAT</SelectLabel>
              <SelectItem value="5%">5%</SelectItem>
              <SelectItem value="10%">10%</SelectItem>
              <SelectItem value="15%">15%</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label htmlFor="attachment">Attachment:</Label>
        <Input
          type="file"
          id="attachment"
          onChange={handleAttachmentChange}
        />
      </div>
    </>
  )}
</CardContent>

      <CardFooter>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
    </div>
  );
}
