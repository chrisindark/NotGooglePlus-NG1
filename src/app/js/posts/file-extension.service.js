(function () {
    // @name FileExtension
    // @desc Factory function to check extension type of file
    // by reading the file name and return the type of file
    // as image/video
    angular
        .module('notgoogleplus.services')
        .factory('FileExtension', FileExtension);

    function FileExtension () {
        var FileExtension = {};

        FileExtension.getType = function (file) {
            return file.type.split('/')[0];
        };

        FileExtension.getContentType = function (file) {
            return file.type.split('/')[1];
        };

        FileExtension.getExtension = function (filename) {
            var parts = filename.split('.');
            return parts[parts.length - 1];
        };

        FileExtension.isImage = function (contentType) {
            switch (contentType) {
                case 'jpg':
                    return true;
                case 'jpeg':
                    return true;
                case 'png':
                    return true;
            }

            return false;
        };

        FileExtension.isVideo = function (contentType) {
            switch (contentType) {
                case 'mp4':
                    return true;
                case 'mpeg4':
                    return true;
                case 'mov':
                    return true;
                case 'ogg':
                    return true;
                case 'webm':
                    return true;
                case 'quicktime':
                    return true;
            }

            return false;
        };

        return FileExtension;

    }

})();
