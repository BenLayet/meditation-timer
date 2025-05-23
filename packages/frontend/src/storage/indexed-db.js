export function createIndexedDb(schema) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(schema.name, schema.changelog.length);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.debug(
        `Upgrading IndexedDB from version ${event.oldVersion} to version ${event.newVersion}`,
      );

      schema.changelog.slice(event.oldVersion).forEach((change) => change(db));
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
