// Store global para gerenciar estado do app
export type Trail = {
  id: string
  name: string
  distance: number
  duration: number
  date: string
  difficulty: "Fácil" | "Moderada" | "Difícil"
  location: string
}

export type UserStats = {
  trilhas: number
  distancia: number
  tempo: number
  nivel: string
  pontos: number
}

class AppStore {
  private trails: Trail[] = []
  private stats: UserStats = {
    trilhas: 0,
    distancia: 0,
    tempo: 0,
    nivel: "Iniciante",
    pontos: 0
  }
  private listeners: Set<() => void> = new Set()

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(listener => listener())
  }

  getTrails() {
    return this.trails
  }

  getStats() {
    return this.stats
  }

  addTrail(trail: Omit<Trail, "id">) {
    const newTrail: Trail = {
      ...trail,
      id: Date.now().toString()
    }
    this.trails.unshift(newTrail)
    this.updateStats()
    this.notify()
  }

  deleteTrail(id: string) {
    this.trails = this.trails.filter(t => t.id !== id)
    this.updateStats()
    this.notify()
  }

  private updateStats() {
    this.stats.trilhas = this.trails.length
    this.stats.distancia = this.trails.reduce((acc, t) => acc + t.distance, 0)
    this.stats.tempo = this.trails.reduce((acc, t) => acc + t.duration, 0)
    this.stats.pontos = Math.floor(this.stats.distancia * 10 + this.stats.tempo * 2)
    
    // Sistema de níveis
    if (this.stats.pontos < 100) this.stats.nivel = "Iniciante"
    else if (this.stats.pontos < 500) this.stats.nivel = "Explorador"
    else if (this.stats.pontos < 1000) this.stats.nivel = "Aventureiro"
    else if (this.stats.pontos < 2500) this.stats.nivel = "Veterano"
    else this.stats.nivel = "Mestre"
  }
}

export const store = new AppStore()
