import { Page } from '../types/page';

export const mockPages: Page[] = [
  {
    id: '1',
    title: 'About Us',
    slug: 'about',
    content: `
      <h2>About Green Cab Tours & Travels</h2>
      <p>Since 2010, we've been crafting unforgettable travel experiences across India. Our passion for exploration and commitment to excellence has made us one of the most trusted names in Indian tourism.</p>
      
      <h3>Our Story</h3>
      <p>Green Cab Tours & Travels was born from a simple belief: every journey should be extraordinary. What started as a small operation in Aurangabad, organizing tours to the magnificent Ajanta and Ellora caves, has grown into a comprehensive travel company serving thousands of travelers each year.</p>
      
      <h3>Our Values</h3>
      <ul>
        <li><strong>Authentic Experiences:</strong> We go beyond tourist spots to offer genuine cultural immersion.</li>
        <li><strong>Sustainable Travel:</strong> Environmental responsibility guides every decision.</li>
        <li><strong>Customer First:</strong> Your safety, comfort, and satisfaction are our top priorities.</li>
      </ul>
    `,
    excerpt: 'Learn about Green Cab Tours & Travels - your trusted travel partner since 2010.',
    metaTitle: 'About Us | Green Cab Tours & Travels',
    metaDescription: 'Discover our story, values, and the team behind Green Cab Tours & Travels. Trusted travel partner for India tours since 2010.',
    status: 'published',
    template: 'default',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-15T10:30:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'Terms and Conditions',
    slug: 'terms',
    content: `
      <h2>Terms and Conditions</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>1. Booking and Payment</h3>
      <p>All bookings are subject to availability and confirmation. A deposit of 30% is required to confirm your booking, with the remaining balance due 14 days before departure.</p>
      
      <h3>2. Cancellation Policy</h3>
      <ul>
        <li>30+ days before departure: Full refund minus processing fee</li>
        <li>15-29 days before departure: 50% refund</li>
        <li>7-14 days before departure: 25% refund</li>
        <li>Less than 7 days: No refund</li>
      </ul>
      
      <h3>3. Travel Insurance</h3>
      <p>We strongly recommend all travelers purchase comprehensive travel insurance covering trip cancellation, medical emergencies, and baggage loss.</p>
      
      <h3>4. Liability</h3>
      <p>Green Cab Tours & Travels acts as an intermediary between travelers and service providers. We are not liable for any injury, damage, or loss arising from the use of these services.</p>
    `,
    excerpt: 'Read our terms and conditions for booking tours with Green Cab Tours & Travels.',
    metaTitle: 'Terms and Conditions | Green Cab Tours & Travels',
    metaDescription: 'Terms and conditions for booking tours with Green Cab Tours & Travels. Includes cancellation policy, payment terms, and liability information.',
    status: 'published',
    template: 'default',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-10T14:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    author: 'Admin',
  },
  {
    id: '3',
    title: 'Privacy Policy',
    slug: 'privacy',
    content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: January 1, 2024</p>
      
      <h3>Information We Collect</h3>
      <p>We collect information you provide directly, including name, email, phone number, and travel preferences when you make a booking or inquiry.</p>
      
      <h3>How We Use Your Information</h3>
      <ul>
        <li>To process and manage your bookings</li>
        <li>To communicate with you about your travel plans</li>
        <li>To send promotional offers (with your consent)</li>
        <li>To improve our services</li>
      </ul>
      
      <h3>Data Security</h3>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
      
      <h3>Your Rights</h3>
      <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@greencab.com for any requests.</p>
    `,
    excerpt: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    metaTitle: 'Privacy Policy | Green Cab Tours & Travels',
    metaDescription: 'Privacy policy for Green Cab Tours & Travels. Learn how we collect, use, and protect your personal information.',
    status: 'published',
    template: 'default',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-20T09:15:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    author: 'Admin',
  },
  {
    id: '4',
    title: 'FAQ',
    slug: 'faq',
    content: `
      <h2>Frequently Asked Questions</h2>
      
      <h3>Booking Questions</h3>
      
      <h4>How do I book a tour?</h4>
      <p>You can book a tour through our website by selecting your preferred tour and dates, or by contacting us directly via phone or email.</p>
      
      <h4>What payment methods do you accept?</h4>
      <p>We accept credit cards, debit cards, UPI, net banking, and bank transfers. International guests can pay via PayPal or wire transfer.</p>
      
      <h3>Tour Information</h3>
      
      <h4>What is included in the tour price?</h4>
      <p>Tour prices typically include accommodation, transportation, guide services, and mentioned activities. Meals and entry fees vary by tour - check each tour's details.</p>
      
      <h4>Can I customize a tour?</h4>
      <p>Yes! We specialize in customized tours. Contact us with your preferences, and we'll create a personalized itinerary just for you.</p>
    `,
    excerpt: 'Find answers to commonly asked questions about our tours and services.',
    metaTitle: 'FAQ | Green Cab Tours & Travels',
    metaDescription: 'Frequently asked questions about Green Cab Tours & Travels. Find answers about booking, payments, tour inclusions, and more.',
    status: 'published',
    template: 'default',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-01T11:00:00Z',
    publishedAt: '2024-02-01T00:00:00Z',
    author: 'Admin',
  },
  {
    id: '5',
    title: 'Refund Policy',
    slug: 'refund-policy',
    content: `
      <h2>Refund Policy</h2>
      <p>We understand that plans can change. Here's our refund policy:</p>
      
      <h3>Standard Refund Schedule</h3>
      <ul>
        <li><strong>45+ days:</strong> 90% refund</li>
        <li><strong>30-44 days:</strong> 75% refund</li>
        <li><strong>15-29 days:</strong> 50% refund</li>
        <li><strong>7-14 days:</strong> 25% refund</li>
        <li><strong>Less than 7 days:</strong> No refund</li>
      </ul>
      
      <h3>Processing Time</h3>
      <p>Refunds are processed within 7-14 business days to your original payment method.</p>
    `,
    excerpt: 'Learn about our refund policy for tour cancellations.',
    metaTitle: 'Refund Policy | Green Cab Tours & Travels',
    metaDescription: 'Refund policy for Green Cab Tours & Travels. Understand our cancellation and refund procedures.',
    status: 'draft',
    template: 'default',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T16:00:00Z',
    publishedAt: null,
    author: 'Admin',
  },
];
