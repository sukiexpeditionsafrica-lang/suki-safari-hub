// Supabase connection, supplied at build time, never hard coded here.
// Run with, for example:
//   flutter run --dart-define=SUPABASE_URL=https://your-project.supabase.co \
//               --dart-define=SUPABASE_ANON_KEY=your-anon-key
// If either value is empty, the app falls back to the bundled places file.
// Never put the service role key in the app. The anon key is the public
// key, and RLS on the places and guides tables is public read only.
const String supabaseUrl = String.fromEnvironment('SUPABASE_URL');
const String supabaseAnonKey = String.fromEnvironment('SUPABASE_ANON_KEY');
bool get supabaseConfigured =>
    supabaseUrl.isNotEmpty && supabaseAnonKey.isNotEmpty;
