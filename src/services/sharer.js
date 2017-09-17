import SharerDialog from './sharer-dialog';

export default class Sharer {
    share(type, link, title) {
        if ('email' === type) {
            window.location = `mailto:?subject=${title}&body=${link}`;
            return false;
        }

        const dialog = this._createShareLink(type, link, title);

        const windowLeft = window.screenLeft ? window.screenLeft : window.screenX;
        const windowTop = window.screenTop ? window.screenTop : window.screenY;
        const left = windowLeft + ((window.innerWidth / 2) - (dialog.getWidth() / 2));
        const top = windowTop + ((window.innerHeight / 2) - (dialog.getHeight() / 2));

        const popup = window.open(
            dialog.getUrl(),
            title,
            `width=${dialog.getWidth()}, height=${dialog.getHeight()}, top=${top}, left=${left}`
        );

        if ('object' === typeof popup && typeof 'undefined' !== popup.opener && null !== popup.opener) {
            popup.opener = null;

            if (window.focus) {
                popup.focus();
            }
        }

        return false;
    }

    _createShareLink(type, link, title) {
        if ('facebook' === type) {
            return new SharerDialog(
                `https://www.facebook.com/dialog/share?app_id=620675918119463&display=popup&href=${link}`,
                555,
                450
            );
        }

        if ('twitter' === type) {
            return new SharerDialog(
                `https://twitter.com/share?url=${link}&text=${title}&via=enmarchefr`,
                600,
                450
            );
        }

        return null;
    }
}
