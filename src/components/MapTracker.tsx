"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type TrailPoint = {
  latitude: number
  longitude: number
  altitude: number | null
  timestamp: string
}

type MapTrackerProps = {
  currentPosition: { lat: number; lng: number } | null
  pontosDaTrilha: TrailPoint[]
  isRecording: boolean
}

export default function MapTracker({ currentPosition, pontosDaTrilha, isRecording }: MapTrackerProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const polylineRef = useRef<L.Polyline | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Posição inicial padrão (Brasil)
    const initialPosition: [number, number] = currentPosition
      ? [currentPosition.lat, currentPosition.lng]
      : [-15.7801, -47.9292]

    // Criar mapa
    const map = L.map(mapContainerRef.current).setView(initialPosition, 15)

    // Adicionar tiles do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Atualizar posição atual
  useEffect(() => {
    if (!mapRef.current || !currentPosition) return

    const { lat, lng } = currentPosition

    // Criar ou atualizar marcador
    if (!markerRef.current) {
      // Ícone customizado para posição atual
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: #f97316;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
            ${isRecording ? 'animation: pulse 2s infinite;' : ''}
          "></div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }
          </style>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      markerRef.current = L.marker([lat, lng], { icon }).addTo(mapRef.current)
    } else {
      markerRef.current.setLatLng([lat, lng])
    }

    // Centralizar mapa na posição atual
    mapRef.current.setView([lat, lng], mapRef.current.getZoom())
  }, [currentPosition, isRecording])

  // Atualizar polyline (trilha)
  useEffect(() => {
    if (!mapRef.current || pontosDaTrilha.length === 0) return

    const latLngs: [number, number][] = pontosDaTrilha.map((p) => [p.latitude, p.longitude])

    if (!polylineRef.current) {
      // Criar polyline
      polylineRef.current = L.polyline(latLngs, {
        color: "#f97316",
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1,
      }).addTo(mapRef.current)
    } else {
      // Atualizar polyline
      polylineRef.current.setLatLngs(latLngs)
    }

    // Ajustar zoom para mostrar toda a trilha
    if (latLngs.length > 1) {
      const bounds = L.latLngBounds(latLngs)
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [pontosDaTrilha])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
      style={{ zIndex: 0 }}
    />
  )
}
