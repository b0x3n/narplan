///////////////////////////////////////////////////////////
//  narplan/public/js/src/Router.js                      //
///////////////////////////////////////////////////////////
//
//
//

    export const Router = () => {

        const   __routes = [
            'About',
            'Services',
            'Contact'
        ];

        const   __pages = [
            'about',
            'services',
            'contact'
        ];


        let     __page;
        let     __hash;


        const __set_page = () => {

            __hash = window.location.hash;

            if (typeof __hash === 'undefined' || __hash === '') {
                __hash = __routes[0];
                __page = __pages[0];
            }
            else {
                if (__hash.substring(0, 1) === '#')
                    __hash = __hash.substring(1);

                if (! __routes.includes(__hash)) {
                    __hash = __routes[0];
                    __page = __pages[0];
                }
                else
                    __page = __pages[__routes.indexOf(__hash)];
            }

            window.location.hash = __hash;

        };


        const __load_pages = () => {

            __pages.forEach(page => {
                $(`#content_page_${page}`).load(`${window.__url}/public/pages/${page}.html`);
            });

        };


        const __show_page = () => {

            const   __image = $(`#image_${__page}`).css('background-image');
            $('#outer').css('background-image', __image);

            $(`#content_page_${__page}`).css({
                'opacity': '0.01',
                'display': 'block'
            });
            
            $(`#content_page_${__page}`).stop().animate({
                'opacity': '0.99'
            }, 500, "linear");

            $('#filter').stop().animate({
                'opacity': '0.25'
            }, 500, "linear");

            $(`#nav_link_${__page}`).stop().animate({
                'color': '#FFDD20'
            }, 500, "linear");

        };


        const __initialise = () => {

            __set_page();
            __load_pages();
            __show_page();

        };


        const _get_page = () => {

            return __page;

        };


        const _get_hash = () => {

            return __hash;

        };


        const _load_page = page => {

            if (! __pages.includes(page))
                return;

            $('nav a').stop().animate({
                'color': '#FFF'
            }, 500, "linear");

            $(`#content_page_${__page}`).stop().animate({
                'opacity': '0.99',
            }, 500, "linear");
            
            $(`#filter`).stop().animate({
                'opacity': '0.99'
            }, 1000, "linear", function() {

                $(`#content_page_${__page}`).css('display', 'none');

                __page = page;
                __hash = __routes[__pages.indexOf(__page)];

                window.location.hash = __hash;

                __show_page();

            });

        };


        __initialise();


        return {

            get_page: _get_page,
            get_hash: _get_hash,
            
            load_page: _load_page

        };

    };
