
/**
 * Fallback component for platforms other than Android.
 * React Native's platform-specific extensions (.android.tsx) will ensure
 * that the real map is only loaded on Android devices.
 */
export default function ChurchMap() {
  return null;
}
