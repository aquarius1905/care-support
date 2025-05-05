import { StatusBar, StyleSheet } from 'react-native';

const UserListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  list: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  }
});

export default UserListStyles;