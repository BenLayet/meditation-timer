class MeditationLocalStorageService {
    saveMeditation(meditation) {
        const meditations = JSON.parse(localStorage.getItem('meditations')) || [];
        meditations.push(meditation);
        localStorage.setItem('meditations', JSON.stringify(meditations));
    }

    fetchStatistics() {
        const meditations = JSON.parse(localStorage.getItem('meditations')) || [];
        // Calculer les statistiques à partir des méditations stockées localement
        // Par exemple, le nombre total de méditations
        const totalMeditations = meditations.length;
        return { totalMeditations };
    }

    getPendingMeditations() {
        return JSON.parse(localStorage.getItem('meditations')) || [];
    }

    clearPendingMeditations() {
        localStorage.removeItem('meditations');
    }
}

export const meditationLocalStorageService = new MeditationLocalStorageService();