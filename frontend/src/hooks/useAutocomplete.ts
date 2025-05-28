import { useState, useEffect, useMemo } from 'react';
import { candidateService } from '../services/candidateService';

interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  degree: string;
  currentPosition: string;
  currentCompany: string;
  experienceDescription: string;
}

export const useAutocomplete = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        console.log('🔄 Cargando candidatos para autocompletado...');
        setLoading(true);
        setError(null);

        const response = await candidateService.getAllCandidates(1, 100);
        console.log('📊 Respuesta de la API:', response);

        const candidatesData = response.data || [];
        console.log('👥 Candidatos cargados:', candidatesData.length);

        setCandidates(candidatesData);
      } catch (error) {
        console.error('❌ Error loading candidates:', error);
        setError('Error al cargar candidatos');
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const getFieldSuggestions = (fieldName: keyof Candidate, searchTerm: string = '') => {
    console.log(`🔍 Buscando sugerencias para campo: ${fieldName}, término: "${searchTerm}"`);
    console.log(`📋 Total candidatos disponibles: ${candidates.length}`);

    if (candidates.length === 0) {
      console.log('⚠️ No hay candidatos disponibles');
      return [];
    }

    // Obtener todos los valores únicos del campo, ordenados por más recientes
    const allValues = candidates
      .map((candidate) => {
        const value = candidate[fieldName];
        console.log(`📝 Valor del campo ${fieldName}:`, value);
        return value;
      })
      .filter((value) => value && typeof value === 'string' && value.trim() !== '')
      .reverse(); // Más recientes primero

    console.log(`📋 Valores encontrados para ${fieldName}:`, allValues);

    // Eliminar duplicados manteniendo el orden (más reciente)
    const uniqueValues = [...new Set(allValues)];
    console.log(`🔄 Valores únicos para ${fieldName}:`, uniqueValues);

    if (!searchTerm.trim()) {
      // Si no hay término de búsqueda, devolver las últimas 10
      const result = uniqueValues.slice(0, 10);
      console.log(`✅ Devolviendo ${result.length} sugerencias sin filtro:`, result);
      return result;
    }

    // Filtrar por término de búsqueda (case insensitive)
    const filtered = uniqueValues.filter((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const result = filtered.slice(0, 10);
    console.log(`✅ Devolviendo ${result.length} sugerencias filtradas:`, result);
    return result;
  };

  return {
    getFieldSuggestions,
    loading,
    error,
    candidatesCount: candidates.length,
  };
};
