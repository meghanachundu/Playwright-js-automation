import dotenv from 'dotenv';

const ENV = process.env.ENV?.trim();
if (ENV) {
  dotenv.config({ path: `.env.${ENV}` });
} else {
  dotenv.config(); // fallback
}

console.log(`[env] Loaded ENV='${ENV || 'default'}' BASE_URL='${process.env.BASE_URL || ''}'`);
