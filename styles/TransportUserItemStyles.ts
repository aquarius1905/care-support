import { StyleSheet } from 'react-native';

const TransportUserItemStyles = StyleSheet.create({
  item: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#447FFF',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeLabel: {
    fontSize: 16,
    color: '#447FFF',
    marginRight: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f5ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  time: {
    fontSize: 20,
    color: '#4a6fa5',
    fontWeight: '500',
  },
  editText: {
    fontSize: 12,
    color: '#6a9eda',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default TransportUserItemStyles;