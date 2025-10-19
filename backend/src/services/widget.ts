
import { Widgets } from '../models/widget';
import { getCachedData, removeKeyFromCache } from '../utils/widget';
import { Location, WidgetLocation } from '../types/widget';

 async function getWidgets() {
  try {
    const results = {data: [] as Location[], message: "Widgets fetched successfully"};
    const widgets = await Widgets.find({});
    console.log('Fetched widgets:', widgets);
    if (widgets && widgets.length > 0) {
     const widgetData = await Promise.all(
          widgets.map(async (widget) => {
            if (!widget.location) {
                return null;
            }
            const weatherData = await getCachedData(widget._id as unknown as string, widget.name, widget.location.coordinates as [number, number]);
            if (!weatherData) {
                return null;
            }
            return weatherData;
          })
        );
     results.data = widgetData.filter((data): data is Location => data !== null);
    return results;
    }
    return  [];
} catch (err) {
  throw new Error('Error fetching widgets: ' + err);
}

}
 async function createWidget(location: WidgetLocation, name: string) {
  try {
    const result = {data:{}, message: "Widget created successfully"};
    const findExisting = await Widgets.findOne({
    location: {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        }
      }
    }
    });
    if (findExisting) {
      throw new Error('Widget already exists for the given location');
    }
    const newWidget = await Widgets.create({ 
      name,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    });
    result.data = newWidget;
    return result;
  } catch (err) {
    throw new Error('Error creating widget: ' + err);
  }
}
 async function deleteWidget(id: string) {
  try {
    const result = { data:{}, message: "Widget deleted successfully"};
    const deleteWidget = await Widgets.findByIdAndDelete(id);
    if (deleteWidget) {
      await removeKeyFromCache(deleteWidget.location?.coordinates as [number, number]);
    }
    return result;
  } catch (err) {
    throw new Error('Error deleting widget: ' + err);
  }
}

export default {
  getWidgets,
  createWidget,
  deleteWidget
};  
