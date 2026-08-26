const db = require('./index');

const colleges = [
  { 
    name: 'IIT MADRAS', 
    location: 'Chennai, Tamil Nadu', 
    fees: 250000, 
    rating: 4.9, 
    description: 'India’s top engineering institute known for research, innovation, and placements.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'MSc', 'PhD']),
    official_website: 'https://www.iitm.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'IIM AHMEDABAD', 
    location: 'Ahmedabad, Gujarat', 
    fees: 2300000, 
    rating: 4.9, 
    description: 'India’s #1 MBA college with global reputation and top placements.', 
    courses: JSON.stringify(['MBA', 'PGP', 'Executive MBA']),
    official_website: 'https://www.iima.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'IIT DELHI', 
    location: 'New Delhi', 
    fees: 240000, 
    rating: 4.8, 
    description: 'Known for innovation, startups, and strong global rankings.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'MBA']),
    official_website: 'https://home.iitd.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'BITS PILANI', 
    location: 'Pilani, Rajasthan', 
    fees: 500000, 
    rating: 4.8, 
    description: 'Top private engineering institute with flexible curriculum and strong placements.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'MSc']),
    official_website: 'https://www.bits-pilani.ac.in',
    brochure_url: 'https://www.bitsadmission.com/bitsat/2024/BITSAT-2024_brochure.pdf'
  },
  { 
    name: 'SRCC', 
    location: 'Delhi', 
    fees: 30000, 
    rating: 4.9, 
    description: 'India’s best commerce college under Delhi University.', 
    courses: JSON.stringify(['B.Com (Hons)', 'Economics']),
    official_website: 'https://www.srcc.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'IIT BOMBAY', 
    location: 'Mumbai, Maharashtra', 
    fees: 250000, 
    rating: 4.9, 
    description: 'Known for startup culture and top placements.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech']),
    official_website: 'https://www.iitb.ac.in',
    brochure_url: 'https://www.iitb.ac.in/newacadhome/ugbrochure2023.pdf'
  },
  { 
    name: 'IIM BANGALORE', 
    location: 'Bangalore, Karnataka', 
    fees: 2400000, 
    rating: 4.8, 
    description: 'One of the top business schools in Asia.', 
    courses: JSON.stringify(['MBA', 'Executive Programs']),
    official_website: 'https://www.iimb.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'ST. STEPHENS COLLEGE', 
    location: 'Delhi', 
    fees: 40000, 
    rating: 4.7, 
    description: 'Elite DU college known for humanities and science.', 
    courses: JSON.stringify(['BA', 'BSc']),
    official_website: 'https://www.ststephens.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'VIT VELLORE', 
    location: 'Vellore, Tamil Nadu', 
    fees: 200000, 
    rating: 4.6, 
    description: 'Popular private engineering college with large campus.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech']),
    official_website: 'https://vit.ac.in',
    brochure_url: 'https://vit.ac.in/files/VITEEE-2024-Information-Brochure.pdf'
  },
  { 
    name: 'HINDU COLLEGE', 
    location: 'Delhi', 
    fees: 25000, 
    rating: 4.8, 
    description: 'Top DU college for science & commerce.', 
    courses: JSON.stringify(['BA', 'BSc']),
    official_website: 'https://www.hinducollege.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'IIT KHARAGPUR', 
    location: 'Kharagpur, West Bengal', 
    fees: 230000, 
    rating: 4.8, 
    description: 'Oldest IIT with huge campus and strong placements.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech']),
    official_website: 'https://www.iitkgp.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'SYMBIOSIS INTERNATIONAL', 
    location: 'Pune, Maharashtra', 
    fees: 300000, 
    rating: 4.6, 
    description: 'Top private university known for MBA & law.', 
    courses: JSON.stringify(['MBA', 'BBA', 'Law']),
    official_website: 'https://www.siu.edu.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'CHRIST UNIVERSITY', 
    location: 'Bangalore, Karnataka', 
    fees: 200000, 
    rating: 4.6, 
    description: 'Well-known for business, commerce & arts.', 
    courses: JSON.stringify(['BBA', 'MBA', 'BA']),
    official_website: 'https://christuniversity.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'FERGUSSON COLLEGE', 
    location: 'Pune, Maharashtra', 
    fees: 20000, 
    rating: 4.5, 
    description: 'Historic college known for arts & science.', 
    courses: JSON.stringify(['BA', 'BSc']),
    official_website: 'https://fergusson.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'NIT TRICHY', 
    location: 'Tiruchirappalli, Tamil Nadu', 
    fees: 180000, 
    rating: 4.7, 
    description: 'One of the best NITs in India.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech']),
    official_website: 'https://www.nitt.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'LOYOLA COLLEGE', 
    location: 'Chennai, Tamil Nadu', 
    fees: 50000, 
    rating: 4.7, 
    description: 'Top arts & commerce college in South India.', 
    courses: JSON.stringify(['BA', 'BCom']),
    official_website: 'https://www.loyolacollege.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'NMIMS MUMBAI', 
    location: 'Mumbai, Maharashtra', 
    fees: 400000, 
    rating: 4.6, 
    description: 'Popular private university for management.', 
    courses: JSON.stringify(['MBA', 'BBA']),
    official_website: 'https://www.nmims.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'MANIPAL ACADEMY (MAHE)', 
    location: 'Manipal, Karnataka', 
    fees: 350000, 
    rating: 4.6, 
    description: 'Known for engineering, medicine, and global exposure.', 
    courses: JSON.stringify(['B.Tech', 'MBBS', 'MBA']),
    official_website: 'https://www.manipal.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'LSR (Lady Shri Ram)', 
    location: 'Delhi', 
    fees: 30000, 
    rating: 4.9, 
    description: 'Top women’s college in India.', 
    courses: JSON.stringify(['BA', 'BCom']),
    official_website: 'https://lsr.edu.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'JADAVPUR UNIVERSITY', 
    location: 'Kolkata, West Bengal', 
    fees: 10000, 
    rating: 4.8, 
    description: 'Government university with high ROI.', 
    courses: JSON.stringify(['Engineering', 'Arts']),
    official_website: 'http://www.jaduniv.edu.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'MIRANDA HOUSE', 
    location: 'Delhi', 
    fees: 20000, 
    rating: 4.9, 
    description: 'Best women’s college (NIRF ranked).', 
    courses: JSON.stringify(['BA', 'BSc']),
    official_website: 'https://www.mirandahouse.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'XAVIER’S COLLEGE', 
    location: 'Mumbai, Maharashtra', 
    fees: 25000, 
    rating: 4.7, 
    description: 'Top arts & commerce college.', 
    courses: JSON.stringify(['BA', 'BCom']),
    official_website: 'https://xaviers.edu',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'IIM CALCUTTA', 
    location: 'Kolkata, West Bengal', 
    fees: 2500000, 
    rating: 4.9, 
    description: 'First IIM, known for finance specialization.', 
    courses: JSON.stringify(['MBA']),
    official_website: 'https://www.iimcal.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'BITS HYDERABAD', 
    location: 'Hyderabad, Telangana', 
    fees: 500000, 
    rating: 4.7, 
    description: 'Strong placements & modern campus.', 
    courses: JSON.stringify(['B.Tech', 'MSc']),
    official_website: 'https://www.bits-pilani.ac.in/hyderabad/',
    brochure_url: 'https://www.bitsadmission.com/bitsat/2024/BITSAT-2024_brochure.pdf'
  },
  { 
    name: 'MIT WORLD PEACE UNIVERSITY (MIT-WPU)', 
    location: 'Pune, Maharashtra', 
    fees: 350000, 
    rating: 4.5, 
    description: 'A global hub for education, research, and innovation in the heart of Pune.', 
    courses: JSON.stringify(['B.Tech', 'MBA', 'Law', 'Design']),
    official_website: 'https://alarduniversity.edu.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'COEP TECHNOLOGICAL UNIVERSITY', 
    location: 'Pune, Maharashtra', 
    fees: 90000, 
    rating: 4.8, 
    description: 'One of the oldest and most prestigious engineering colleges in Asia.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'PhD']),
    official_website: 'https://www.coep.org.in',
    brochure_url: 'https://www.coep.org.in/page_assets/shared/COEP_Brochure.pdf'
  },
  { 
    name: 'DTU (Delhi Technological University)', 
    location: 'Delhi', 
    fees: 180000, 
    rating: 4.7, 
    description: 'Premier engineering university known for its rich legacy and placements.', 
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'MBA']),
    official_website: 'https://www.dtu.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  { 
    name: 'SPJIMR MUMBAI', 
    location: 'Mumbai, Maharashtra', 
    fees: 2000000, 
    rating: 4.8, 
    description: 'A top-ranked management institute known for its unique pedagogy.', 
    courses: JSON.stringify(['PGDM', 'Global Management']),
    official_website: 'https://www.spjimr.org',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'ALARD UNIVERSITY, PUNE',
    location: 'Pune, Maharashtra',
    fees: 150000,
    rating: 4.2,
    description: 'Private university focused on engineering, management, pharmacy with strong industry exposure.',
    courses: JSON.stringify(['B.Tech', 'MBA', 'BBA', 'B.Pharm']),
    official_website: 'https://alarduniversity.edu.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  // NEW COLLEGES ADDED BELOW
  {
    name: 'IIT ROORKEE',
    location: 'Roorkee, Uttarakhand',
    fees: 240000,
    rating: 4.8,
    description: 'One of the oldest technical institutes in Asia, famous for its engineering programs and heritage.',
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'B.Arch']),
    official_website: 'https://www.iitr.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'BITS GOA',
    location: 'Zuarinagar, Goa',
    fees: 500000,
    rating: 4.7,
    description: 'Beautiful campus of BITS Pilani on the banks of Zuari river, offering top-tier engineering and sciences.',
    courses: JSON.stringify(['B.Tech', 'M.Sc', 'M.Tech']),
    official_website: 'https://www.bits-pilani.ac.in/goa/',
    brochure_url: 'https://www.bitsadmission.com/bitsat/2024/BITSAT-2024_brochure.pdf'
  },
  {
    name: 'NIT SURATHKAL',
    location: 'Mangalore, Karnataka',
    fees: 170000,
    rating: 4.7,
    description: 'Top-tier NIT located right next to the beach, renowned for exceptional placements and research.',
    courses: JSON.stringify(['B.Tech', 'M.Tech', 'MCA']),
    official_website: 'https://www.nitk.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    name: 'IIM INDORE',
    location: 'Indore, Madhya Pradesh',
    fees: 2100000,
    rating: 4.7,
    description: 'Elite business school offering standard PGP and unique Integrated Programme in Management (IPM).',
    courses: JSON.stringify(['MBA', 'IPM', 'Executive MBA']),
    official_website: 'https://www.iimidr.ac.in',
    brochure_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

const seed = async () => {
  try {
    console.log('Seeding database with updated colleges, websites and brochures...');
    await db.query('DELETE FROM reviews');
    await db.query('DELETE FROM saved_colleges');
    await db.query('DELETE FROM colleges');
    await db.query('ALTER SEQUENCE colleges_id_seq RESTART WITH 1');

    for (const college of colleges) {
      const rating = parseFloat(college.rating);
      const cutoffRank = Math.floor((5.1 - rating) * 2000) + Math.floor(Math.random() * 500);
      
      const nameTag = college.name.split(' ').slice(0, 2).join('+');
      const imageUrl = `https://placehold.co/800x600/3b82f6/ffffff?text=${nameTag}`;

      await db.query(
        'INSERT INTO colleges (name, location, fees, rating, description, image_url, courses, cutoff_rank, brochure_url, official_website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [college.name, college.location, college.fees, college.rating, college.description, imageUrl, college.courses, cutoffRank, college.brochure_url, college.official_website]
      );
      console.log(`Synced: ${college.name}`);
    }
    console.log('All colleges successfully seeded with brochure and website links!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seed();
