import { StatusBar, StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#447FFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f0f5ff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    backgroundColor: '#447FFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  errorMessage: {
    color: '#F44336',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
});

export default LoginStyles;