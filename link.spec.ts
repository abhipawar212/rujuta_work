// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'playwright.config-tests',
      testMatch: 'playwright.config.ts', // Only run this file
      use: {
        // ... extension configuration
      },
    },
    {
      name: 'Buyer.logistics-tests',
      testMatch: 'Buyer.logistics.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
     {
      name: 'rfq_creation-tests',
      testMatch: 'rfq_creation.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
     {
      name: 'rfq_payment-tests',
      testMatch: 'rfq_payment.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
    
    {
      name: 'Seller_Logistic_RFQ-tests',
      testMatch: 'Seller_Logistic_RFQ.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
    {
      name: 'Sufin_Logistics-tests',
      testMatch: 'Sufin_Logistics.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
    {
      name: 'Seller_Logistic_RFQ-tests',
      testMatch: 'Seller_Logistic_RFQ.spec.ts', // Run all tests in functional folder
      use: {
        // ... normal browser configuration
      },
    },
    // {
    //   name: 'return_order-tests',
    //   testMatch: 'return_order.spec.ts', // Run all tests in functional folder
    //   use: {
    //     // ... normal browser configuration
    //   },
    // },
    

  ],
});