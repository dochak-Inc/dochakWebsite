/**
 * Test script to verify data transformation with actual Technologies data
 */

import { transformTechnologiesData } from './dataTransform.js';

// Import the actual technologies data (we'll simulate it here for testing)
const technologies = [
  {
    title: 'Visum Mesoscopic Model​',
    subtitle: 'A mesoscopic traffic demand prediction and operation evaluation model',
    image: './assets/meso.webp',
    features: [
      {
        title: 'How it works',
        desc: [
          'Uses SBA (Simulation Based Assignment) with dynamic traffic assignment.',
          'Considers time-varying traffic volume and road capacity for precise forecasting.',
          'Connects with Vissim micro-simulation for detailed scenario evaluations.'
        ]
      },
      {
        title: 'What it can do',
        desc: [
          'Predicts traffic demand and congestion for large developments and major events (e.g., Olympics, Expos).',
          'Supports optimal traffic signal plans under different development conditions.',
          'Enables efficient, scalable traffic operation analysis for new projects.'
        ]
      },
      {
        title: 'Where it can be used',
        desc: [
          'Large-scale development projects.',
          'Major event traffic management.',
          'Traffic operation centers and government agencies.',
          'Consulting projects in Korea, Saudi Arabia, UAE, Southeast Asia.'
        ]
      }
    ]
  }
];

// Test the transformation
try {
  const enhancedContent = transformTechnologiesData(technologies);
  console.log('✅ Data transformation successful!');
  console.log('Enhanced content structure:');
  console.log(JSON.stringify(enhancedContent, null, 2));
} catch (error) {
  console.error('❌ Data transformation failed:', error.message);
}

export { technologies };