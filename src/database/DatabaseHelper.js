import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('products.db');

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, category TEXT, image TEXT);',
      [],
      () => { console.log('Table created successfully'); },
      (tx, error) => { console.log('Failed to create table', error); }
    );
  });
};

export const insertProduct = (name, description, price, category, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO products (name, description, price, category, image) values (?, ?, ?, ?, ?);',
      [name, description, price, category, image],
      (tx, result) => { console.log('Product inserted successfully', result); },
      (tx, error) => { console.log('Failed to insert product', error); }
    );
  });
};

export const fetchProducts = (setProducts) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM products;',
      [],
      (tx, result) => {
        const rows = result.rows;
        let products = [];
        for (let i = 0; i < rows.length; i++) {
          products.push(rows.item(i));
        }
        setProducts(products);
      },
      (tx, error) => { console.log('Failed to fetch products', error); }
    );
  });
};

export const updateProduct = (id, name, description, price, category, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?;',
      [name, description, price, category, image, id],
      (tx, result) => { console.log('Product updated successfully', result); },
      (tx, error) => { console.log('Failed to update product', error); }
    );
  });
};

export const deleteProduct = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM products WHERE id = ?;',
      [id],
      (tx, result) =>  { console.log('Product deleted successfully', result); },
      (tx, error) => { console.log('Failed to delete product', error); }
    );
  });
};
