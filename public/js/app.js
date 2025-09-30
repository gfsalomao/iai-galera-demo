/* app.js */

// Aguarda a carga completa do DOM
document.addEventListener('DOMContentLoaded', () => {
    const kpiService = new KpiService();
    const kpiController = new KpiController(kpiService);
    
    // Configurar o envio do formulário de filtros
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const filters = {
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            team: document.getElementById('team').value,
            activityType: document.getElementById('activityType').value,
            project: document.getElementById('project').value
        };
        kpiController.loadKpis(filters);
    });
});
