(function () {
    angular
        .module('notgoogleplus.utils')
        .service('Utility', Utility);

    Utility.$inject = [];

    function Utility () {
        var self = this;

        this.likeUnlike = function (obj, response) {
            if (obj.liked === null) {
            // if 'liked' is null, change it to the 'liked' in response
            // and increase likes count by one.
                if (response.data.liked === true) {
                    ++obj.likes_count;
                } else {
                    ++obj.dislikes_count;
                }
            } else if (obj.liked === true) {
                // if 'liked' is true, change it to the 'liked' in response
                // if response liked is false, increase dislikes count by one
                // and decrease likes by one.
                if (response.data.liked === false) {
                    --obj.likes_count;
                    ++obj.dislikes_count;
                } else {
                    --obj.likes_count;
                }
            } else {
                // if 'liked' is false, change it to the 'liked' in response
                // if response liked is false, increase dislikes count by one
                // and decrease likes by one.
                if (response.data.liked === true) {
                    ++obj.likes_count;
                    --obj.dislikes_count;
                } else {
                    --obj.dislikes_count;
                }
            }

            obj.liked = response.data.liked;
        };
    }

})();
