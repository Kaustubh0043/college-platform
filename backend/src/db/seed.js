const db = require('./index');

const colleges = [
  { name: 'ALARD UNIVERSITY, PUNE', location: 'Pune, Maharashtra', fees: 150000, rating: 4.2, description: 'Private university focused on engineering, management, pharmacy with strong industry exposure.', courses: JSON.stringify(['B.Tech', 'MBA', 'BBA', 'B.Pharm']) },
  { name: 'IIT MADRAS', location: 'Chennai, Tamil Nadu', fees: 250000, rating: 4.9, description: 'India’s top engineering institute known for research, innovation, and placements.', courses: JSON.stringify(['B.Tech', 'M.Tech', 'MSc', 'PhD']) },
  { name: 'IIM AHMEDABAD', location: 'Ahmedabad, Gujarat', fees: 2300000, rating: 4.9, description: 'India’s #1 MBA college with global reputation and top placements.', courses: JSON.stringify(['MBA', 'PGP', 'Executive MBA']) },
  { name: 'IIT DELHI', location: 'New Delhi', fees: 240000, rating: 4.8, description: 'Known for innovation, startups, and strong global rankings.', courses: JSON.stringify(['B.Tech', 'M.Tech', 'MBA']) },
  { name: 'BITS PILANI', location: 'Pilani, Rajasthan', fees: 500000, rating: 4.8, description: 'Top private engineering institute with flexible curriculum and strong placements.', courses: JSON.stringify(['B.Tech', 'M.Tech', 'MSc']) },
  { name: 'SRCC', location: 'Delhi', fees: 30000, rating: 4.9, description: 'India’s best commerce college under Delhi University.', courses: JSON.stringify(['B.Com (Hons)', 'Economics']) },
  { name: 'IIT BOMBAY', location: 'Mumbai, Maharashtra', fees: 250000, rating: 4.9, description: 'Known for startup culture and top placements.', courses: JSON.stringify(['B.Tech', 'M.Tech']) },
  { name: 'IIM BANGALORE', location: 'Bangalore, Karnataka', fees: 2400000, rating: 4.8, description: 'One of the top business schools in Asia.', courses: JSON.stringify(['MBA', 'Executive Programs']) },
  { name: 'ST. STEPHENS COLLEGE', location: 'Delhi', fees: 40000, rating: 4.7, description: 'Elite DU college known for humanities and science.', courses: JSON.stringify(['BA', 'BSc']) },
  { name: 'VIT VELLORE', location: 'Vellore, Tamil Nadu', fees: 200000, rating: 4.6, description: 'Popular private engineering college with large campus.', courses: JSON.stringify(['B.Tech', 'M.Tech']) },
  { name: 'HINDU COLLEGE', location: 'Delhi', fees: 25000, rating: 4.8, description: 'Top DU college for science & commerce.', courses: JSON.stringify(['BA', 'BSc']) },
  { name: 'IIT KHARAGPUR', location: 'Kharagpur, West Bengal', fees: 230000, rating: 4.8, description: 'Oldest IIT with huge campus and strong placements.', courses: JSON.stringify(['B.Tech', 'M.Tech']) },
  { name: 'SYMBIOSIS INTERNATIONAL', location: 'Pune, Maharashtra', fees: 300000, rating: 4.6, description: 'Top private university known for MBA & law.', courses: JSON.stringify(['MBA', 'BBA', 'Law']) },
  { name: 'CHRIST UNIVERSITY', location: 'Bangalore, Karnataka', fees: 200000, rating: 4.6, description: 'Well-known for business, commerce & arts.', courses: JSON.stringify(['BBA', 'MBA', 'BA']) },
  { name: 'FERGUSSON COLLEGE', location: 'Pune, Maharashtra', fees: 20000, rating: 4.5, description: 'Historic college known for arts & science.', courses: JSON.stringify(['BA', 'BSc']) },
  { name: 'NIT TRICHY', location: 'Tiruchirappalli, Tamil Nadu', fees: 180000, rating: 4.7, description: 'One of the best NITs in India.', courses: JSON.stringify(['B.Tech', 'M.Tech']) },
  { name: 'LOYOLA COLLEGE', location: 'Chennai, Tamil Nadu', fees: 50000, rating: 4.7, description: 'Top arts & commerce college in South India.', courses: JSON.stringify(['BA', 'BCom']) },
  { name: 'NMIMS MUMBAI', location: 'Mumbai, Maharashtra', fees: 400000, rating: 4.6, description: 'Popular private university for management.', courses: JSON.stringify(['MBA', 'BBA']) },
  { name: 'MANIPAL ACADEMY (MAHE)', location: 'Manipal, Karnataka', fees: 350000, rating: 4.6, description: 'Known for engineering, medicine, and global exposure.', courses: JSON.stringify(['B.Tech', 'MBBS', 'MBA']) },
  { name: 'LSR (Lady Shri Ram)', location: 'Delhi', fees: 30000, rating: 4.9, description: 'Top women’s college in India.', courses: JSON.stringify(['BA', 'BCom']) },
  { name: 'JADAVPUR UNIVERSITY', location: 'Kolkata, West Bengal', fees: 10000, rating: 4.8, description: 'Government university with high ROI.', courses: JSON.stringify(['Engineering', 'Arts']) },
  { name: 'MIRANDA HOUSE', location: 'Delhi', fees: 20000, rating: 4.9, description: 'Best women’s college (NIRF ranked).', courses: JSON.stringify(['BA', 'BSc']) },
  { name: 'XAVIER’S COLLEGE', location: 'Mumbai, Maharashtra', fees: 25000, rating: 4.7, description: 'Top arts & commerce college.', courses: JSON.stringify(['BA', 'BCom']) },
  { name: 'IIM CALCUTTA', location: 'Kolkata, West Bengal', fees: 2500000, rating: 4.9, description: 'First IIM, known for finance specialization.', courses: JSON.stringify(['MBA']) },
  { name: 'BITS HYDERABAD', location: 'Hyderabad, Telangana', fees: 500000, rating: 4.7, description: 'Strong placements & modern campus.', courses: JSON.stringify(['B.Tech', 'MSc']) },
  { name: 'MIT WORLD PEACE UNIVERSITY (MIT-WPU)', location: 'Pune, Maharashtra', fees: 350000, rating: 4.5, description: 'A global hub for education, research, and innovation in the heart of Pune.', courses: JSON.stringify(['B.Tech', 'MBA', 'Law', 'Design']) },
  { name: 'COEP TECHNOLOGICAL UNIVERSITY', location: 'Pune, Maharashtra', fees: 90000, rating: 4.8, description: 'One of the oldest and most prestigious engineering colleges in Asia.', courses: JSON.stringify(['B.Tech', 'M.Tech', 'PhD']) },
  { name: 'DTU (Delhi Technological University)', location: 'Delhi', fees: 180000, rating: 4.7, description: 'Premier engineering university known for its rich legacy and placements.', courses: JSON.stringify(['B.Tech', 'M.Tech', 'MBA']) },
  { name: 'SPJIMR MUMBAI', location: 'Mumbai, Maharashtra', fees: 2000000, rating: 4.8, description: 'A top-ranked management institute known for its unique pedagogy.', courses: JSON.stringify(['PGDM', 'Global Management']) }
];

const seed = async () => {
  try {
    console.log('Seeding database with High-End Branded Cards...');
    await db.query('DELETE FROM reviews');
    await db.query('DELETE FROM saved_colleges');
    await db.query('DELETE FROM colleges');
    await db.query('ALTER SEQUENCE colleges_id_seq RESTART WITH 1');

    for (const college of colleges) {
      const rating = parseFloat(college.rating);
      const cutoffRank = Math.floor((5.1 - rating) * 2000) + Math.floor(Math.random() * 500);
      
      // Using a highly stable, professional branded placeholder service
      const nameTag = college.name.split(' ').slice(0, 2).join('+');
      const imageUrl = `https://placehold.co/800x600/3b82f6/ffffff?text=${nameTag}`;

      await db.query(
        'INSERT INTO colleges (name, location, fees, rating, description, image_url, courses, cutoff_rank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [college.name, college.location, college.fees, college.rating, college.description, imageUrl, college.courses, cutoffRank]
      );
      console.log(`Synced: ${college.name}`);
    }
    console.log('100% Reliability Sync Complete! All cards now look professional.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seed();
