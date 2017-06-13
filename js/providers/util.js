import { Toast } from 'native-base';

class Util {

    notification(message, type) {
        Toast.show({
            supportedOrientations: ['potrait', 'landscape'],
            text: message,
            position: 'bottom',
            type: ((type)? type : ''),
            duration: 3000
        })
    }
}

export default (new Util);
