/**
 * Parari layers.
 * @memberof parari
 * @constructor layers
 */
(function (pr, document) {
    "use strict";

    /** @lends layers */
    pr.layers = {
        /** Short names for layers. */
        get _layerNameMap(){
            return {
	    resolve: pr.layers.ResolveLayer,
	    starFlow: pr.layers.StarFlowLayer,
	    sunLight: pr.layers.SunLightLayer
	};
        },
        /** Default layer options. */
        get _layerOptions(){
            return {
	    starFlow: {},
	    sunLight: {}
	};
        }
    };


})(window.parari = window.parari || {}, document);