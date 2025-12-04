import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type TrailPoint = {
  latitude: number
  longitude: number
  altitude: number | null
  timestamp: string
}

export type Trail = {
  id: string
  nome: string
  data: string
  tempo_total: number
  distancia_total: number
  velocidade_media: number
  velocidade_maxima: number
  pontos_gps: TrailPoint[]
  dificuldade?: 'Fácil' | 'Moderada' | 'Difícil'
}
