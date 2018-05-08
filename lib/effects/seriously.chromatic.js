/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	Seriously.plugin('invert', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',
				//'varying vec2 texdim0;', //original

				'uniform sampler2D source;',
				'uniform float amp;'


				'void main(void) {',

					'vec2 uv = vTexCoord.xy;',
					//'float b_d = length(uv-texdim0.xy*.5);',//original
					'float b_d = length(uv*.5);',

					'float blur = 0.0;',
					'blur = (1.0 + sin(amp*6.0)) * 0.5;',
					'blur *= 1.0 + sin(amp*16.0) * 0.5;',
					'blur = pow(blur, 3.0);',
					'blur *= 0.05;',
					// reduce blur towards center
					'blur *= b_d;',
					'blur *= 50.;',
					
					
				    'vec3 col;',
				    'col.r = texture2D( source, vec2(uv.x+blur,uv.y) ).r;',
				    'col.g = texture2D( source, uv ).g;',
				    'col.b = texture2D( source, vec2(uv.x-blur,uv.y) ).b;',
					
					'float scanline = sin(uv.y*800.0)*0.0;',
					'col -= scanline;',
					
					//'vec2 vignette_uv = vTexCoord.xy / texdim0.xy;', //original
					'vec2 vignette_uv = vTexCoord.xy;',
					'float d = length(vignette_uv - vec2(0.5,0.5));',
					'col *= 1.0 - d * 0.5;',
					'gl_FragColor = vec4(col,1.0);',

				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			amount: {
				type: 'number',
				uniform: 'amp',
				defaultValue: 1,
				min: 0
			}
		},
		title: 'Chromatic',
		description: 'Shift RGB Channels'
	});
}));







