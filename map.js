var osm = new ol.layer.Tile({
	title: 'OpenStreetMap',
	type: 'base',
	visible: true,
	source: new ol.source.OSM()
});
var stamenWatercolor = new ol.layer.Tile({
title: 'Stamen Watercolor',
type: 'base',
visible: false,
source: new ol.source.Stamen({
layer: 'watercolor'
})
});

var bingRoads = new ol.layer.Tile({
title: 'Bing Maps—Roads',
type: 'base',
visible: false,
source: new ol.source.BingMaps({
key: 'AhVnxSFIxWx8p8gzW1oleRsLlHMN4NNXSSAqi2AEOBEP9tzBxWbQiDiZlOG4sdYR',
imagerySet: 'Road'
})
});

var bingAerial = new ol.layer.Tile({
title: 'Bing Maps—Aerial',
type: 'base',
visible: false,
source: new ol.source.BingMaps({
key: 'AhVnxSFIxWx8p8gzW1oleRsLlHMN4NNXSSAqi2AEOBEP9tzBxWbQiDiZlOG4sdYR',
imagerySet: 'Aerial'
})
});

var bingAerialWithLabels = new ol.layer.Tile({
title: 'Bing Maps—Aerial with Labels',
type: 'base',
visible: false,
source: new ol.source.BingMaps({
key: 'AhVnxSFIxWx8p8gzW1oleRsLlHMN4NNXSSAqi2AEOBEP9tzBxWbQiDiZlOG4sdYR',
imagerySet: 'AerialWithLabels'
})
});

var plosStandard = new ol.layer.Image({
	title: 'PLOS Standard Classes',
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8082/geoserver/wfs',
		params: {'LAYERS': 'GIS_Lab:plos_standard,GIS_Lab:plos_standard_legend'}
	}),
	visible: false
});
var plosModified = new ol.layer.Image({
	title: 'PLOS Modified Classes',
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8082/geoserver/wfs',
		params: {'LAYERS': 'GIS_Lab:plos_modified,GIS_Lab:plos_modified_legend'}
	}),
	visible: false
});
var enhancedPlosStandard = new ol.layer.Image({
	title: 'Enhanced PLOS Standard Classes',
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8082/geoserver/wfs',
		params: {'LAYERS': 'GIS_Lab:enhanced_plos_standard,GIS_Lab:enhanced_plos_standard_legend'}
	}),
	visible: false
});
var enhancedPlosModified = new ol.layer.Image({
	title: 'Enhanced PLOS Modified Classes',
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8082/geoserver/wfs',
		params: {'LAYERS': 'GIS_Lab:enhanced_plos_modified,GIS_Lab:enhanced_plos_modified_legend'}
	}),
	visible: false
});
var rawData = new ol.layer.Image({
	title: 'Raw Collected Data Points',
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8082/geoserver/wfs',
		params: {'LAYERS': 'GIS_Lab:raw_data'}
	}),
	visible: false
});


var map = new ol.Map({
	target: document.getElementById('map'),
	layers: [
	new ol.layer.Group({
		title: 'Base Maps',
		layers: [stamenWatercolor,bingRoads,bingAerialWithLabels,bingAerial,osm]
	}),
	new ol.layer.Group({
		title: 'Results',
		layers: [enhancedPlosModified,enhancedPlosStandard,plosModified,plosStandard,rawData]
	})
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([9.1655,45.50127]),
		zoom: 17.2
	}),
	controls: ol.control.defaults().extend([
		new ol.control.ScaleLine(),
		new ol.control.FullScreen(),
		new ol.control.OverviewMap(),
		new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326'
		})
		])
});

var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);