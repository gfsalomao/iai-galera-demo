/* kpiController.js */

class KpiController {
    constructor(kpiService) {
        this.kpiService = kpiService;
        this.kpiContainer = document.getElementById('kpiContainer');
        this.alertSection = document.getElementById('alertSection');
        
        // Carrega os KPIs inicialmente
        this.loadKpis();

        // Atualiza os KPIs periodicamente (a cada 30 segundos)
        setInterval(() => this.loadKpis(), 30000);
    }

    async loadKpis(filters = {}) {
        try {
            const kpis = await this.kpiService.fetchKpis(filters);
            this.renderKpis(kpis);
            this.checkSlaAlerts(kpis);
        } catch (error) {
            console.error('Erro ao carregar KPIs', error);
        }
    }

    renderKpis(kpis) {
        // Limpa o container
        this.kpiContainer.innerHTML = '';
        
        if (Array.isArray(kpis) && kpis.length) {
            kpis.forEach(kpi => {
                const card = document.createElement('div');
                card.className = 'kpi-card';
                card.innerHTML = `
                    <h3>${kpi.name || 'KPI'}</h3>
                    <p>Valor: ${kpi.value}</p>
                    <p>Meta: ${kpi.goal}</p>
                `;
                this.kpiContainer.appendChild(card);
            });
        } else {
            this.kpiContainer.innerHTML = '<p>Nenhum KPI encontrado.</p>';
        }
    }

    checkSlaAlerts(kpis) {
        // Limpa alertas anteriores
        this.alertSection.innerHTML = '';

        // Para cada KPI, verifica se a métrica está próxima do limite SLA
        // Consideramos que, se o valor for igual ou superior a 90% do slaThreshold, um alerta deve ser disparado
        kpis.forEach(kpi => {
            if (kpi.slaThreshold && kpi.value >= kpi.slaThreshold * 0.9) {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert';
                alertDiv.textContent = `Alerta: O KPI "${kpi.name}" está próximo de atingir o SLA!`;
                this.alertSection.appendChild(alertDiv);
            }
        });
    }
}

// Expondo a classe para uso global
window.KpiController = KpiController;
