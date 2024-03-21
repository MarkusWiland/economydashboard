"use client";
import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Tidsrapportering() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weeksSaved, setWeeksSaved] = useState([]);
  console.log("weeksSaved", weeksSaved);
  const startDate = startOfWeek(currentWeek, { locale: svLocale });
  const endDate = endOfWeek(currentWeek, { locale: svLocale });

  const [timeReports, setTimeReports] = useState([
    {
      year: 2024,
      weeks: [
        {
          weekNumber: 12,
          reports: [
            { day: "Måndag", hours: 0 },
            { day: "Tisdag", hours: 0 },
            { day: "Onsdag", hours: 0 },
            { day: "Torsdag", hours: 0 },
            { day: "Fredag", hours: 0 },
            { day: "Lördag", hours: 0 },
            { day: "Söndag", hours: 0 },
          ],
        },
      ],
    },
  ]);

  console.log("timeReports", timeReports);
  /**
   * Return the total number of hours for the current week.
   *
   * @returns {number} Total number of hours for the current week
   */
  const calculateTotalHours = () => {
    return timeReports.reduce((acc, curr) => acc + curr.hours, 0);
  };

  const handleTimeChange = (yearIndex, weekIndex, dayIndex, hours) => {
    if (hours < 0 || hours > 24) return; // Validera timmarna
  
    // Skapa en kopia av timeReports
    const updatedTimeReports = [...timeReports];
  
    // Hämta den aktuella veckan för det specifika året
    const year = updatedTimeReports[yearIndex];
    const week = year.weeks[weekIndex];
  
    // Uppdatera antalet timmar för den specifika dagen
    week.reports[dayIndex].hours = hours;
  
    // Uppdatera state med den uppdaterade timeReports
    setTimeReports(updatedTimeReports);
  };
  

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    const nextWeek = addWeeks(currentWeek, 1);
    if (startOfWeek(nextWeek) <= startOfWeek(new Date())) {
      setCurrentWeek(nextWeek);
    }
  };
  const handleSaveWeek = () => {
    // Få det aktuella datumet
    const currentDate = new Date();

    // Få det aktuella året
    const currentYear = format(currentDate, "yyyy");

    // Få starten på veckan för det första datumet i året
    const startOfYear = startOfWeek(new Date(currentYear, 0, 1));

    // Få starten på den aktuella veckan baserat på dagens datum
    const startOfCurrentWeek = startOfWeek(currentDate);

    // Beräkna veckonumret
    const weekNumber = Math.ceil(
      (currentDate - startOfYear) / (7 * 24 * 60 * 60 * 1000)
    );

    console.log("startOfCurrentWeek", startOfCurrentWeek);
    console.log("Current Year:", currentYear);
    console.log("Current Week Number:", weekNumber);
  };

  const isNextWeekDisabled = () => {
    const nextWeek = addWeeks(currentWeek, 1);
    return startOfWeek(nextWeek) > startOfWeek(new Date());
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Tidsrapportering</h1>
      <div className="mb-4">
        <Button onClick={goToPreviousWeek}>Föregående vecka</Button>
        <span>
          {format(startDate, "d MMMM yyyy", { locale: svLocale })} -{" "}
          {format(endDate, "d MMMM yyyy", { locale: svLocale })}
        </span>

        <Button onClick={goToNextWeek} disabled={isNextWeekDisabled()}>
          Nästa vecka
        </Button>
        <Button onClick={handleSaveWeek}>Spara vecka</Button>
        <Button>Stäng Månad</Button>
      </div>
      <div
        className="w-full"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {timeReports.map((yearData) =>
          yearData.weeks.map((weekData) => (
            <div
            className="flex"
              key={`${yearData.year}-${weekData.weekNumber}`}
              style={{ marginBottom: "20px" }}
            >
              <h2>
                År: {yearData.year}, Vecka: {weekData.weekNumber}
              </h2>
              {weekData.reports.map((report, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Label>{report.day}: </Label>
                  <Input
                    type="number"
                    value={report.hours}
                    onChange={(e) =>
                      handleTimeChange(index, parseFloat(e.target.value))
                    }
                    style={{ marginRight: "10px" }}
                  />

                  <p key={index}>{report.hours} timmar</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <p>Total tid per vecka: {calculateTotalHours()} timmar</p>
    </div>
  );
}
