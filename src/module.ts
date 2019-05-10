import {AppPlugin} from '@grafana/ui';
import {ExampleTab1} from './config/ExampleTab1';
import {ExampleTab2} from './config/ExampleTab2';
import {ExampleRootPage} from './ExampleRootPage';
import {QuarumApp} from './QuarumApp';

// Needed to get an enable/disable button
export {ConfigCtrl} from './legacy/config';

// The React Plugin structure
export const plugin = new AppPlugin()
  .setRootPage(ExampleRootPage)
  .addConfigTab({
    title: 'Tab 1',
    icon: 'fa fa-info',
    body: ExampleTab1,
    id: 'tab1',
  })
  .addConfigTab({
    title: 'Tab 2',
    icon: 'fa fa-user',
    body: ExampleTab2,
    id: 'tab2',
  });

export const quarum = new QuarumApp(plugin);
