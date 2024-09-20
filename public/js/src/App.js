///////////////////////////////////////////////////////////
//  narplan/public/js/src/App.js                         //
///////////////////////////////////////////////////////////
//
//
//

    import { Blox } from "./Blox.js";
    import { Router } from "./Router.js";
    import { Nav } from "./Nav.js";


    export const App = () => {

        const   __blox = Blox();
        const   __router = Router();
        const   __nav = Nav(__router);
        

        const __initialise = () => {

            console.log('READY')

        };


        __initialise();

    };
