import { Router } from 'express';
import httpStatus from 'http-status-codes';
import { onlyAuthed } from 'modules/Auth/middlewares';
import {
  subscribeToWidget,
  unsubscribeToWidget,
  getWidgets,
  getWidgetData
} from './controlers';
import { success } from 'utils/apiUtils';

const widgetRouter = Router();

widgetRouter.get('/', onlyAuthed, async (req, res) => {
  const { user } = req as any;
  const widgets = await getWidgets(user);

  res.status(httpStatus.OK).json(success({ widgets }));
});

widgetRouter.get('/data/:widgetId', onlyAuthed, async (req, res) => {
  const { widgetId } = req.params;
  const widgetData = await getWidgetData(widgetId);

  res.status(httpStatus.OK).json(success({ widgetData }));
});

widgetRouter.post(
  '/subscribe/:serviceName/:widgetName',
  onlyAuthed,
  async (req, res) => {
    const { user } = req as any;
    const { widgetName, serviceName } = req.params;
    const widget = await subscribeToWidget(user, serviceName, widgetName);

    res.status(httpStatus.OK).json(success({ widget }));
  }
);

widgetRouter.post('/unsubscribe/:widgetId', onlyAuthed, async (req, res) => {
  const { widgetId } = req.params;
  await unsubscribeToWidget(widgetId);

  res.status(httpStatus.OK).json(success(null));
});

export default widgetRouter;
