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
				title: 	'Информер'
			}],
			items:		[{
				priority: 1,
        section: 'inform',
        title: 	'Настройки',
        url: 		'/inform/options'
      }]
		}
	}
};

export {ncInformOptions, manifest};
