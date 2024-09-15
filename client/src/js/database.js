import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic for adding content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the object store and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to update or add data to the store
  const request = store.put({ id: 1, content: content });

  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// Logic for getting all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the object store and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data from the store
  const request = store.getAll();

  // Confirm the request
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result.content;
};

// Call initdb() to initialize the database
initdb();