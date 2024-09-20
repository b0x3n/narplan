///////////////////////////////////////////////////////////
//  public/src/js/Blox.js                                //
///////////////////////////////////////////////////////////
//
//
//

    export const Blox = (

        objConfigure = {

            'target_id': 'header_title',
            'blox_cell_class': 'header_title_tile',
            'width': 4,
            'height': 4,
            'frequency': 10000,
            'animation_duration': 1000,
            'animation_frame': 50,
            'spacing': 1,
            'blox': [
                "000000000000000000000000000000000000",
                "011100111000111011100100001110011100",
                "010010000101000010010100000001010010",
                "010010111101000011100100001111010010",
                "010010100101000010000100001001010010",
                "010010011101000010000111100111010010",
                "000000000000000000000000000000000000"
            ],
            'attrs': {
                '0': {
                    'background-color': '#1E90FF',
                    'opacity': '0.90'
                },
                '1': {
                    'background-color': '#FFF',
                    'opacity': '0.90'
                },
            }

        }

    ) => {
        
        const   __objPairs = [
            // {
            //     'first': {},
            //     'last': {
            //         '0': { 'background-color': "#FFDD22" },
            //         '1': { 'background-color': '#82B' }
            //     }
            // },
            // {
            //     'first': {},
            //     'last': {
            //         '0': { 'background-color': '#1E90FF' },
            //         '1': { 'background-color': '#FFF' }
            //     }
            // },
            // {
            //     'first': {},
            //     'last': {
            //         '0': { 'background-color': '#FFF' },
            //         '1': { 'background-color': '#1E90FF' }
            //     }
            // },
            // {
            //     'first': {},
            //     'last': {
            //         '0': { 'background-color': '#FFF' },
            //         '1': { 'background-color': '#82B' }
            //     }
            // },
            {
                'first': {
                    '0': { 'opacity': '0.99', 'background-color': '#82B' },
                    '1': { 'opacity': '0.75', 'background-color': '#FFF' }
                },
                'last': {
                    '0': { 'opacity': '0.90', 'background-color': '#FFF' },
                    '1': { 'opacity': '0.99', 'background-color': '#82B' }
                }
            },
            {
                'first': {
                    '0': { 'opacity': '0.99', 'background-color': '#FFF' },
                    '1': { 'opacity': '0.75', 'background-color': '#FFCC00' }
                },
                'last': {
                    '0': { 'opacity': '0.90', 'background-color': '#FFCC00' },
                    '1': { 'opacity': '0.99', 'background-color': '#FFF' }
                }
            },
            {
                'first': {
                    '0': { 'opacity': '0.99', 'background-color': '#FFF' },
                    '1': { 'opacity': '0.75', 'background-color': '#1E90FF' }
                },
                'last': {
                    '0': { 'opacity': '0.90', 'background-color': '#1E90FF' },
                    '1': { 'opacity': '0.99', 'background-color': '#FFF' }
                }
            }
        ];

        let __last_pair = {
            'first': {
                '0': { 'opacity': '0.99', 'background-color': '#FFF' },
                '1': { 'opacity': '0.75', 'background-color': '#1E90FF' }
            },
            'last': {
                '0': { 'opacity': '0.90', 'background-color': '#1E90FF' },
                '1': { 'opacity': '0.99', 'background-color': '#FFF' }
            }
        }


///////////////////////////////////////////////////////////
//  __build_html()                                       //
///////////////////////////////////////////////////////////
//
        const   __build_html = () => {

            const   __el = $(`#${objConfigure['target_id']}`);
            const   __attrs = objConfigure['attrs'];

            const   __width = objConfigure['width'];
            const   __height = objConfigure['height'];

            let     __col_offset = 0;
            let     __row_offset = 0;

            for (let row = 0; row < objConfigure['blox'].length; row++) {
                __col_offset = 0;

                for (let col = 0; col < objConfigure['blox'][row].length; col++) {
                    const   __char = objConfigure['blox'][row].substring(col, (col + 1));

                    __el.append(`
                        <div
                            id="${objConfigure['target_id']}_cell_${row}_${col}"
                            class="${objConfigure['blox_cell_class']}"
                            style="
                                top: ${(__height * row) + __row_offset}px;
                                left: ${(__width * col) + __col_offset}px;
                                width: ${__width}px;
                                height: ${__height}px;
                            "
                        >
                            &nbsp;
                        </div>
                    `);

                    if (objConfigure.hasOwnProperty('spacing'))
                        __col_offset += objConfigure['spacing'];

                    if (__attrs.hasOwnProperty(__char))
                        $(`#${objConfigure['target_id']}_cell_${row}_${col}`).css(__attrs[__char]);
                    else
                        $(`#${objConfigure['target_id']}_cell_${row}_${col}`).css({
                            'visibility': 'hidden'
                        });
                }

                if (objConfigure.hasOwnProperty('spacing'))
                    __row_offset += objConfigure['spacing'];
            }

        };


///////////////////////////////////////////////////////////
//  __horizontal_animation()                             //
///////////////////////////////////////////////////////////
//
        const   __horizontal_animation = (
            objFirst,
            objLast,
            row,
            direction
        ) => {

            if (row < 0 || row >= objConfigure['blox'].length)
                return;

            setTimeout(() => {
                if (direction === 'top_to_bottom')
                    __horizontal_animation(objFirst, objLast, (row + 1), direction);
                else
                    __horizontal_animation(objFirst, objLast, (row - 1), direction);
            }, objConfigure['animation_frame']);

            for (let col = 0; col < objConfigure['blox'][row].length; col++) {
                const   __char = objConfigure['blox'][row].substring(col, (col + 1));

                if (objFirst.hasOwnProperty(__char)) {
                    $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                        objFirst[__char],
                        objConfigure['animation_duration'],
                        "linear"
                    );
                }
            
                if (objLast.hasOwnProperty(__char)) {
                    setTimeout(() => {
                        if (objLast.hasOwnProperty(__char)) {
                            $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                                objLast[__char],
                                objConfigure['animation_duration'],
                                "linear"
                            );
                        }
                    }, objConfigure['animation_duration']);
                }
            }

        };


///////////////////////////////////////////////////////////
//  __vertical_animation()                               //
///////////////////////////////////////////////////////////
//
        const   __vertical_animation = (
            objFirst,
            objLast,
            col,
            direction
        ) => {

            if (col < 0 || col >= objConfigure['blox'][0].length)
                return;

            setTimeout(() => {
                if (direction === 'left_to_right')
                    __vertical_animation(objFirst, objLast, (col + 1), direction);
                else
                    __vertical_animation(objFirst, objLast, (col - 1), direction);
            }, objConfigure['animation_frame']);

            for (let row = 0; row < objConfigure['blox'].length; row++) {
                const   __char = objConfigure['blox'][row].substring(col, (col + 1));

                if (objFirst.hasOwnProperty(__char)) {
                    $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                        objFirst[__char],
                        objConfigure['animation_duration'],
                        "linear"
                    );
                }
            
                if (objLast.hasOwnProperty(__char)) {
                    setTimeout(() => {
                        if (objLast.hasOwnProperty(__char)) {
                            $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                                objLast[__char],
                                objConfigure['animation_duration'],
                                "linear"
                            );
                        }
                    }, objConfigure['animation_duration']);
                }
            }

        };


///////////////////////////////////////////////////////////
//  __top_to_bottom()                                    //
///////////////////////////////////////////////////////////
//
        const   __top_to_bottom = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) => {

            __horizontal_animation(
                objFirst,
                objLast,
                0,
                'top_to_bottom'
            );

        };


///////////////////////////////////////////////////////////
//  __top_to_bottom()                                    //
///////////////////////////////////////////////////////////
//
        const   __bottom_to_top = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) => {

            __horizontal_animation(
                objFirst,
                objLast,
                (objConfigure['blox'].length - 1),
                'bottom_to_top'
            );

        };


///////////////////////////////////////////////////////////
//  __left_to_right()                                    //
///////////////////////////////////////////////////////////
//
        const   __left_to_right = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) => {

            __vertical_animation(
                objFirst,
                objLast,
                0,
                'left_to_right'
            );

        };


///////////////////////////////////////////////////////////
//  __right_to_left()                                    //
///////////////////////////////////////////////////////////
//
        const   __right_to_left = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) => {

            __vertical_animation(
                objFirst,
                objLast,
                (objConfigure['blox'][0].length - 1),
                'right_to_left'
            );

        };


///////////////////////////////////////////////////////////
//  __animate_cols()                                     //
///////////////////////////////////////////////////////////
//
        const   __animate_cols = (
            objFirst,
            objLast,
            row,
            col,
            direction
        ) => {

            if (row < 0 || row >= objConfigure['blox'].length)
                return;
            if (col < 0 || col >= objConfigure['blox'][row].length)
                return;

            const   __char = objConfigure['blox'][row].substring(col, (col + 1));

            if (objFirst.hasOwnProperty(__char)) {
                $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                    objFirst[__char],
                    objConfigure['animation_duration'],
                    "linear"
                );
            }

            if (objLast.hasOwnProperty(__char)) {
                setTimeout(() => {    
                    $(`#${objConfigure['target_id']}_cell_${row}_${col}`).stop().animate(
                        objLast[__char],
                        objConfigure['animation_duration'],
                        "linear"
                    );
                }, objConfigure['animation_frame']);
            }

            setTimeout(() => {
                if (direction === 'top_left' || direction === 'bottom_left')
                    col++;
                else
                    col--;
                __animate_cols(objFirst, objLast, row, col, direction);
            }, objConfigure['animation_frame']);
        };


///////////////////////////////////////////////////////////
//  __animate_rows()                                     //
///////////////////////////////////////////////////////////
//
        const   __animate_rows = (
            objFirst,
            objLast,
            row,
            direction
        ) => {

            if (row < 0 || row >= objConfigure['blox'].length)
                return;
            
            let     col = 0;

            if (direction !== 'top_left' && direction !== 'bottom_left')
                col = (objConfigure['blox'][row].length - 1);
                
            __animate_cols(objFirst, objLast, row, col, direction);

            setTimeout(() => {
                if (direction === 'top_left' || direction === 'top_right')
                    row++;
                else
                    row--;
                __animate_rows(objFirst, objLast, row, direction);
            }, objConfigure['animation_frame']);

        };


///////////////////////////////////////////////////////////
//  __top_left_diagonal()                                //
///////////////////////////////////////////////////////////
//
        const   __top_left_diagonal = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) =>
        {

            __animate_rows(objFirst, objLast, 0, 'top_left');

        };


///////////////////////////////////////////////////////////
//  __top_right_diagonal()                               //
///////////////////////////////////////////////////////////
//
        const   __top_right_diagonal = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) =>
        {

            __animate_rows(
                objFirst,
                objLast,
                0,
                'top_right'
            );

        };


///////////////////////////////////////////////////////////
//  __bottom_left_diagonal()                             //
///////////////////////////////////////////////////////////
//
        const   __bottom_left_diagonal = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) =>
        {

            __animate_rows(
                objFirst,
                objLast,
                (objConfigure['blox'].length - 1),
                'bottom_left'
            );

        };


///////////////////////////////////////////////////////////
//  __bottom_right_diagonal()                            //
///////////////////////////////////////////////////////////
//
        const   __bottom_right_diagonal = (
            objFirst = { 
                '0': { 'background-color': '#FFF' },
                '1': { 'background-color': '#1E90FF' }
            },
            objLast = {
                '0': { 'background-color': '#1E90FF' },
                '1': { 'background-color': '#FFF' }
            }
        ) =>
        {

            __animate_rows(
                objFirst,
                objLast,
                (objConfigure['blox'].length - 1),
                'bottom_right'
            );

        };


///////////////////////////////////////////////////////////
//  __animate()                                          //
///////////////////////////////////////////////////////////
//
        const   __animate = () => {

            const   __directions = [
                __top_to_bottom,
                __bottom_to_top,
                __left_to_right,
                __right_to_left,
                __top_left_diagonal,
                __top_right_diagonal,
                __bottom_left_diagonal,
                __bottom_right_diagonal
            ];

            const   __index = Math.floor(Math.random() * __directions.length);
            let     __pair_index = Math.floor(Math.random() * __objPairs.length);

            while (__objPairs[__pair_index] === __last_pair)
                __pair_index = Math.floor(Math.random() * __objPairs.length);
            __last_pair = __objPairs[__pair_index];

            const   _direction = __directions[__index];

            _direction(
                __objPairs[__pair_index]['first'],
                __objPairs[__pair_index]['last']
            );

            objConfigure['timeout_id'] = setTimeout(() => {
                __animate();
            }, objConfigure['frequency']);

        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const   __initialise = () => {

            __build_html();
            __animate();

        };


        __initialise();

    };

