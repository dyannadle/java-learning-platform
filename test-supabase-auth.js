import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual .env parsing
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    const email = `antigravity.test.${Date.now()}@gmail.com`; // Use a real-looking domain
    const password = 'Password@123';

    console.log(`Attempting Sign Up with ${email}...`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        console.error('Sign Up Error:', signUpError.message);
        // It might be that email confirmation is required, or user already exists
    } else {
        console.log('Sign Up Success:', signUpData.user ? 'User Created' : 'No User Returned (Verify Email probably)');
    }

    // Try Login (might fail if email needs verification, but let's test)
    console.log(`Attempting Sign In with ${email}...`);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        console.error('Sign In Error:', signInError.message);
    } else {
        console.log('Sign In Success. Session Token:', !!signInData.session);
    }
}

testAuth();
