import { StyleSheet } from 'react-native';

const HeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#447FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    padding: 5,
  },
});

export default HeaderStyles;
