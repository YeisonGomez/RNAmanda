import { Toast } from 'native-base';

class Util {

    dev = false;

    notification(message, type) {
        if (dev) {
            Toast.show({
                supportedOrientations: ['potrait', 'landscape'],
                text: message,
                position: 'bottom',
                buttonText: ' ',
                type: ((type) ? type : ''),
                duration: 3000
            })
        }
    }
}

export default (new Util);
