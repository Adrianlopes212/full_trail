export type GPSPoint = {
  latitude: number
  longitude: number
  altitude: number | null
  timestamp: string
  speed: number | null
}

export class GPSTracker {
  private watchId: number | null = null
  private points: GPSPoint[] = []
  private startTime: number | null = null
  private onUpdate?: (data: TrackingData) => void

  async requestPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      throw new Error('GPS não disponível neste dispositivo')
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      if (result.state === 'denied') {
        throw new Error('Permissão de localização negada')
      }
      return true
    } catch (error) {
      // Fallback: tenta obter localização diretamente
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(true),
          () => reject(new Error('Permissão de localização negada'))
        )
      })
    }
  }

  startTracking(onUpdate: (data: TrackingData) => void) {
    this.onUpdate = onUpdate
    this.points = []
    this.startTime = Date.now()

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const point: GPSPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          timestamp: new Date().toISOString(),
          speed: position.coords.speed
        }

        this.points.push(point)
        
        if (this.onUpdate) {
          this.onUpdate(this.getTrackingData())
        }
      },
      (error) => {
        console.error('Erro ao obter localização:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  stopTracking(): TrackingData {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
    return this.getTrackingData()
  }

  getTrackingData(): TrackingData {
    const tempoTotal = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0
    const distanciaTotal = this.calculateTotalDistance()
    const velocidadeMedia = tempoTotal > 0 ? (distanciaTotal / (tempoTotal / 3600)) : 0
    const velocidadeMaxima = this.calculateMaxSpeed()
    const velocidadeAtual = this.points.length > 0 
      ? (this.points[this.points.length - 1].speed || 0) * 3.6 
      : 0

    return {
      pontos_gps: this.points,
      tempo_total: tempoTotal,
      distancia_total: distanciaTotal,
      velocidade_media: velocidadeMedia,
      velocidade_maxima: velocidadeMaxima,
      velocidade_atual: velocidadeAtual
    }
  }

  private calculateTotalDistance(): number {
    if (this.points.length < 2) return 0

    let total = 0
    for (let i = 1; i < this.points.length; i++) {
      total += this.haversineDistance(
        this.points[i - 1].latitude,
        this.points[i - 1].longitude,
        this.points[i].latitude,
        this.points[i].longitude
      )
    }
    return total
  }

  private calculateMaxSpeed(): number {
    if (this.points.length === 0) return 0
    
    const speeds = this.points
      .map(p => p.speed ? p.speed * 3.6 : 0)
      .filter(s => s > 0)
    
    return speeds.length > 0 ? Math.max(...speeds) : 0
  }

  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1)
    const dLon = this.toRad(lon2 - lon1)
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

export type TrackingData = {
  pontos_gps: GPSPoint[]
  tempo_total: number
  distancia_total: number
  velocidade_media: number
  velocidade_maxima: number
  velocidade_atual: number
}
