const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const outputDir = path.join(__dirname, '..', 'public', 'blogs');
fs.mkdirSync(outputDir, { recursive: true });

const posts = [
  {
    fileName: 'blog-1-how-scrap-collection-works-in-dubai.pdf',
    title: 'Blog 1: How Scrap Collection Works in Dubai',
    paragraphs: [
      'Scrap collection in Dubai is now easier with verified collectors, clear pricing, and digital scheduling.',
      'Customers can book pickups quickly, prepare materials in advance, and receive updates until collection is complete.',
      'This guide explains the process from booking to collection and highlights the value of professional service.',
    ],
  },
  {
    fileName: 'blog-2-what-items-can-you-sell-as-scrap-in-uae.pdf',
    title: 'Blog 2: What Items Can You Sell as Scrap in UAE',
    paragraphs: [
      'Many households and businesses in the UAE can sell metal, paper, cardboard, plastics, and electronic scrap.',
      'Clean, separated materials usually get better prices and faster pickup scheduling.',
      'The right preparation helps you reduce waste and maximize the value of every collection.',
    ],
  },
  {
    fileName: 'blog-3-why-businesses-need-professional-scrap-collection-services.pdf',
    title: 'Blog 3: Why Businesses Need Professional Scrap Collection Services',
    paragraphs: [
      'Professional scrap collection helps companies manage waste safely, efficiently, and responsibly.',
      'It improves site cleanliness, supports compliance, and saves time for internal teams.',
      'Partnering with a trusted provider makes scrap disposal predictable and more valuable for business operations.',
    ],
  },
  {
    fileName: 'blog-4-e-waste-recycling-in-dubai-everything-you-need-to-know.pdf',
    title: 'Blog 4: E-Waste Recycling in Dubai — Everything You Need to Know',
    paragraphs: [
      'E-waste includes old electronics, cables, batteries, and appliances that should be handled responsibly.',
      'Dubai businesses and households can recycle e-waste safely through certified collection and processing services.',
      'Proper recycling protects the environment, recovers useful materials, and reduces the risks of improper disposal.',
    ],
  },
];

async function generateAll() {
  for (const post of posts) {
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(path.join(outputDir, post.fileName));
    doc.pipe(writeStream);

    doc.fontSize(18).text(post.title, { align: 'left' });
    doc.moveDown(1.2);
    doc.fontSize(12);

    post.paragraphs.forEach((paragraph) => {
      doc.text(paragraph, { align: 'left' });
      doc.moveDown(0.8);
    });

    doc.end();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }

  console.log('Generated PDF files in', outputDir);
}

generateAll().catch((error) => {
  console.error('Failed to generate PDFs:', error);
  process.exit(1);
});
