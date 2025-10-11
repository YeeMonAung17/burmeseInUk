import { JSX } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

export const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
