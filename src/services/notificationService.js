import { useNotification } from 'naive-ui';

const notification = useNotification();

const notify = (type, message, duration = 2500) => {
    notification[type]({
        content: message,
        duration,
        keepAliveOnHover: true,
    });
};

export default {
    info(message, duration) {
        notify('info', message, duration);
    },
    success(message, duration) {
        notify('success', message, duration);
    },
    warning(message, duration) {
        notify('warning', message, duration);
    },
    error(message, duration) {
        notify('error', message, duration);
    },
};
