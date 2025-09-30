/* kpiService.js */

class KpiService {
    constructor() {
        // URL da API para recuperar KPIs
        this.apiUrl = '/';
    }

    async fetchKpis(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        const url = `${this.apiUrl}?${query}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar KPIs');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

// Expondo a classe para uso global
window.KpiService = KpiService;
