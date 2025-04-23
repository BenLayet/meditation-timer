import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { resolveServiceWorkerDependencies } from './service-worker.dependencies';

const bgSyncPlugin = new BackgroundSyncPlugin('meditationQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});

registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [bgSyncPlugin],
  }),
);

// Event listener for sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-events') {
    event.waitUntil(synchronizeEvents());
  }
});

async function synchronizeEvents() {
  console.log('Syncing events...');

  const {eventSynchronizationService, indexedDb} = await resolveServiceWorkerDependencies();
  await eventSynchronizationService.synchronizeEvents();
  console.log('Events synchronized');

  indexedDb.close();
  console.log('IndexedDB closed');
}