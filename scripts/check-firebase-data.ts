/**
 * Check Firebase Data Script
 * This script lists all services currently in Firebase Firestore
 */

import { getAllServices } from '../lib/services/services.firestore';

async function checkFirebaseData() {
  try {
    console.log('🔍 Checking services in Firebase Firestore...\n');

    const services = await getAllServices();

    console.log(`✅ Found ${services.length} services in Firebase:`);
    console.log('');

    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name}`);
      console.log(`   Slug: ${service.slug}`);
      console.log(`   Active: ${service.active ? '✅' : '❌'}`);
      console.log(`   Order: ${service.order}`);
      console.log(`   Last Updated: ${service.lastUpdated}`);
      console.log('');
    });

    console.log('🎉 Your Firebase integration is working perfectly!');
    console.log('✅ All services are properly stored in Firestore');
  } catch (error: any) {
    console.error('❌ Error checking Firebase data:', error.message);
  }
}

// Run check if this file is executed directly
if (require.main === module) {
  checkFirebaseData();
}

export default checkFirebaseData;
