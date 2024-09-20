///////////////////////////////////////////////////////////
//  narplan/public/js/src/Nav.js                         //
///////////////////////////////////////////////////////////
//
//
//

    export const Nav = router => {


        const __initialise_mouse_events = () => {

            $('nav a').on('mouseover', function() {
                const   __page = router.get_page();
                const   __id = $(this).attr('id').replace('nav_link_', '');
                
                if (__page === __id)
                    return;

                $(this).stop().animate({
                    'color': '#FFDD20'
                }, 200, "linear");
            });

            $('nav a').on('mouseout', function() {
                const   __page = router.get_page();
                const   __id = $(this).attr('id').replace('nav_link_', '');
                
                if (__page === __id)
                    return;

                $(this).stop().animate({
                    'color': '#FFF'
                }, 200, "linear");
            });

            $('nav a').on('click', function(e) {
                e.preventDefault();

                const   __page = router.get_page();
                const   __id = $(this).attr('id').replace('nav_link_', '');
                
                if (__page === __id)
                    return;

                router.load_page(__id);
            });

        };


        const __initialise = () => {

            __initialise_mouse_events();

        };


        __initialise();

    };
