import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as SecureStore from 'expo-secure-store';

import { User } from '../types/user';
import { AuthContext } from '../context/AuthContext';



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if(user) setUser(JSON.parse(user))
    }
  
    getUser()
  }, [])
  

  return (
    <AuthContext.Provider value= {{user, setUser}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="FindLocationScreen" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="SignInScreen" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="ForgotPasswordScreen" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="SignUpScreen" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="ResetPasswordScreen" options={{ headerShown: false, presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
