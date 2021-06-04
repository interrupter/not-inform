import ncInformOptions from '../../common/ncInformOptions.js';

let manifest = {
	router: {
		manifest: [
			ncInformOptions.getRoutes()
		]
	},
	menu: {
		side:{
			sections: [{
				id: 		'inform',
				title: 	'not-inform:menuTitle',
				place: 	'end'
			}],
			items:		[{
				id: 			'inform.options',
        section: 	'inform',
				priority: 1,
        title: 		'not-inform:menuTitleOptions',
        url: 			'/inform/options'
      }]
		}
	}
};

export {ncInformOptions, manifest};
