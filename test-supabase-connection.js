import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual .env parsing
const envPath = path.resolve(__dirname, '.env');
console.log('Reading .env from:', envPath);

try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            env[key] = value;
        }
    });

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

    console.log('Supabase URL:', supabaseUrl);
    // console.log('Supabase Key:', supabaseKey); // Don't log key

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing env vars in .env file');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    async function test() {
        console.log('Attempting to fetch session...');
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Supabase Auth Error:', error.message);
            } else {
                console.log('Success! Connection established.');
                console.log('Current Session:', data.session ? 'Active' : 'None');
            }
        } catch (err) {
            console.error('Exception during connection:', err);
        }
    }

    test();

} catch (e) {
    console.error('Failed to read .env file:', e.message);
}
