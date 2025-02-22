"use client"

import { Bed, Clock } from "lucide-react"
import { useState } from "react"

interface Room {
  number: string
  type: "SENCILLA" | "DOBLE" | "TRIPLE"
  status: "disponible" | "ocupada" | "reservada" | "limpieza"
  floor: string
}

export default function recepcion() {
  const [selectedFloor, setSelectedFloor] = useState("PRIMER NIVEL")

  const floors = ["PRIMER NIVEL", "SEGUNDO NIVEL", "TERCER NIVEL", "CUARTO NIVEL"]

  // Sample room data
  const rooms: Room[] = [
    { number: "203", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "204", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "205", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "206", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "207", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "208", type: "DOBLE", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "209", type: "DOBLE", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "210", type: "DOBLE", status: "limpieza", floor: "PRIMER NIVEL" },
    { number: "211", type: "DOBLE", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "212", type: "DOBLE", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "213", type: "DOBLE", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "214", type: "DOBLE", status: "limpieza", floor: "PRIMER NIVEL" },
    { number: "215", type: "SENCILLA", status: "ocupada", floor: "PRIMER NIVEL" },
    { number: "216", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "217", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "218", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "219", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
    { number: "220", type: "SENCILLA", status: "disponible", floor: "PRIMER NIVEL" },
  ]

  const getStatusColor = (status: Room["status"]) => {
    switch (status) {
      case "disponible":
        return "bg-emerald-500 hover:bg-emerald-600"
      case "ocupada":
        return "bg-red-500 hover:bg-red-600"
      case "reservada":
        return "bg-blue-500 hover:bg-blue-600"
      case "limpieza":
        return "bg-cyan-500 hover:bg-cyan-600"
    }
  }

  const getStatusText = (status: Room["status"]) => {
    switch (status) {
      case "disponible":
        return "Disponible"
      case "ocupada":
        return "Ocupada"
      case "reservada":
        return "Reservación"
      case "limpieza":
        return "Limpieza intermedia"
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Vista General Recepción</h1>
        
        
      </div>

      <div className="mb-6 border-b">
        <nav className="flex gap-2">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${
                  selectedFloor === floor
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
            >
              {floor}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {rooms
          .filter((room) => room.floor === selectedFloor)
          .map((room) => (
            <div
              key={room.number}
              className={`relative rounded-lg ${getStatusColor(room.status)} p-4 text-white transition-all duration-200`}
            >
              <div className="absolute top-2 right-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs">24hr</span>
              </div>

              <div className="flex flex-col h-full">
                <div className="text-2xl font-bold mb-1">{room.number}</div>
                <div className="text-sm mb-2">{room.type}</div>
                <div className="flex items-center mt-auto">
                  <Bed className="w-4 h-4 mr-2" />
                  <span className="text-sm">{getStatusText(room.status)}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

