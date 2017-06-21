import { Toast } from 'native-base';

class Util {

    dev = true;

    notification(message, type) {
        if (this.dev) {
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
