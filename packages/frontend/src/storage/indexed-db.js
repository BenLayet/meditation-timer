export function createIndexedDb(schema) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(schema.name, schema.changelog.length);
    request.onupgradeneeded = async (event) => {
      const db = event.target.result;
      const upgradeTransaction = event.target.transaction;
      console.debug(
        `Upgrading IndexedDB from version ${event.oldVersion} to version ${event.newVersion}`,
      );
      const changes = schema.changelog.slice(event.oldVersion);
      for (const change of changes) {
        await change(db, upgradeTransaction);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
