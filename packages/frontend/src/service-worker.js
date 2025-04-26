import {resolveServiceWorkerDependencies} from './service-worker.dependencies.js';

// Event listener for sync event
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-events') {
        event.waitUntil(synchronizeEvents());
    }
});

async function synchronizeEvents() {
    console.log('synchronizeEvents called');

    const {eventSynchronizationService, indexedDb} = await resolveServiceWorkerDependencies();
    await eventSynchronizationService.synchronizeEvents();
    console.log('Events synchronized');

    indexedDb.close();
    console.log('IndexedDB closed');
}