const db = require('./index');

const migrate = async () => {
  try {
    console.log('Running database migrations...');

    // 1. Add brochure_url and official_website columns to colleges table
    console.log('Altering colleges table...');
    await db.query(`
      ALTER TABLE colleges 
      ADD COLUMN IF NOT EXISTS brochure_url TEXT,
      ADD COLUMN IF NOT EXISTS official_website TEXT;
    `);

    // 2. Create inquiries table
    console.log('Creating inquiries table if not exists...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
          id SERIAL PRIMARY KEY,
          college_id INTEGER REFERENCES colleges(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          query TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error running migrations:', err);
    process.exit(1);
  }
};

migrate();
