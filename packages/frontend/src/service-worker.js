import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

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
  if (event.tag === 'sync-meditations') {
    event.waitUntil(syncMeditations());
  }
});

async function syncMeditations() {
  const db = await openDB('MeditationDB', 1);
  const tx = db.transaction('meditations', 'readonly');
  const store = tx.objectStore('meditations');
  const pendingMeditations = await store.getAll();

  for (const meditation of pendingMeditations) {
    try {
      await fetch('/api/v1/meditations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meditation),
      });
      const deleteTx = db.transaction('meditations', 'readwrite');
      const deleteStore = deleteTx.objectStore('meditations');
      await deleteStore.delete(meditation.id);
    } catch (error) {
      console.error('Error syncing meditation:', error);
    }
  }
}