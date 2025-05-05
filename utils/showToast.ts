import Toast from 'react-native-root-toast';

// トースト表示用のヘルパー関数
const showToast = (message: string, isSuccess: boolean = true) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: isSuccess ? '#447FFF' : '#F44336', //成功：青、失敗：赤
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    containerStyle: {
      padding: 15,
      borderRadius: 10,
    },
  });
};

export default showToast;
