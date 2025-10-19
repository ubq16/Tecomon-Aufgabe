
import { Request, Response } from 'express';
import WidgetService from '../services/widget';
import { Location, WidgetLocation } from '../types/widget';

export async function getWidgets(req: Request, res: Response) {
  try {
    const widget = await WidgetService.getWidgets();
    if (!widget) {
      return res.status(404).json({ error: 'No widgets found for the given location' });
    }

    res.status(200).json(widget);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function createWidget(req: Request, res: Response) {
  try {
    const { location, name }: { location: WidgetLocation, name: string } = req.body;
    const newWidget = await WidgetService.createWidget(location, name);
    if (!newWidget) {
      return res.status(400).json({ error: 'Widget already exists for the given location' });
    }
    res.status(201).json(newWidget);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteWidget(req: Request, res: Response) {
  try {
    const { id } = req.params;
   const result = await WidgetService.deleteWidget(id);
   if (!result) {
     return res.status(404).json({ error: 'Widget not found' });
   }
    res.status(204).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

