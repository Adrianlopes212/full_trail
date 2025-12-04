"use client"

/**
 * Sistema de Navegação Centralizado
 * Todas as actions de navegação do app
 */

// Função principal de navegação usando Next.js
export const navigateToScreen = (screen: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = screen
  }
}

// ============================================
// ACTIONS PARA O MENU SUPERIOR
// ============================================

export const go_inicio = () => {
  navigateToScreen('/')
}

export const go_mapa = () => {
  navigateToScreen('/mapa')
}

export const go_trilha = () => {
  navigateToScreen('/trilhas')
}

export const go_manutencao = () => {
  navigateToScreen('/manutencao')
}

export const go_comunidade = () => {
  navigateToScreen('/comunidade')
}

export const go_perfil = () => {
  navigateToScreen('/perfil')
}

// ============================================
// ACTIONS DAS NOVAS TELAS
// ============================================

export const go_esquadrao = () => {
  navigateToScreen('/esquadrao')
}

export const go_loja_fisica = () => {
  navigateToScreen('/loja_fisica')
}

export const go_sos = () => {
  navigateToScreen('/sos')
}

export const go_gravar_trilha = () => {
  navigateToScreen('/trilhas/nova')
}

// ============================================
// ACTIONS PARA BOTÕES DA HOME
// ============================================

export const action_nova_trilha = () => {
  navigateToScreen('/trilhas/nova')
}

export const action_esquadrao = () => {
  navigateToScreen('/esquadrao')
}

export const action_loja_fisica = () => {
  navigateToScreen('/loja_fisica')
}

export const action_sos = () => {
  navigateToScreen('/sos')
}

export const action_manutencao = () => {
  navigateToScreen('/manutencao')
}

export const action_gravar_primeira_trilha = () => {
  navigateToScreen('/trilhas/nova')
}

// ============================================
// MAPA DE TODAS AS ACTIONS
// ============================================

export const navigationActions = {
  // Menu Superior
  go_inicio,
  go_mapa,
  go_trilha,
  go_manutencao,
  go_comunidade,
  go_perfil,
  
  // Novas Telas
  go_esquadrao,
  go_loja_fisica,
  go_sos,
  go_gravar_trilha,
  
  // Botões da Home
  action_nova_trilha,
  action_esquadrao,
  action_loja_fisica,
  action_sos,
  action_manutencao,
  action_gravar_primeira_trilha,
}

export type NavigationAction = keyof typeof navigationActions
