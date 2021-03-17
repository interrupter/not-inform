import ncInformOptions from '../../common/ncInformOptions.js';

let manifest = {
	router: {
		manifest: [
			{
				paths: ['inform/options'],
				controller: ncInformOptions
			}
		]
	},
	menu: {
		side:{
			sections: [{
				id: 		'inform',
				title: 	'Информер',
				place: 	'end'
			}],
			items:		[{
				id: 			'inform.options',
        section: 	'inform',
				priority: 1,
        title: 		'Настройки',
        url: 			'/inform/options'
      }]
		}
	}
};

export {ncInformOptions, manifest};
