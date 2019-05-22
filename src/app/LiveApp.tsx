import {AppPlugin, AppPluginMeta} from '@grafana/ui';

import {AppOptions, EventType} from 'types';
import {LiveSocket} from 'app/LiveSocket';
import {PartialObserver} from 'rxjs';
import Fingerprint2 from 'fingerprintjs2';
import {PageTracker, PageEvent} from 'feature/PageTracker';
import {SessionTracker} from 'feature/SessionTracker';
import {LiveWidgets} from 'widget/LapnapWidgets';

export class LiveApp extends AppPlugin<AppOptions> {
  live?: LiveSocket;
  widgets?: LiveWidgets;

  readonly sessions = new SessionTracker();
  readonly pageTracker = new PageTracker();

  init(meta: AppPluginMeta<AppOptions>) {
    if (this.meta) {
      console.log('Already initalized....');
      return;
    }
    if (this.live) {
      console.log('LIVE Already initalized....');
      return;
    }

    // this.elem = document.createElement('div');
    // document.body.append(this.elem);

    // Initalize in a little bit
    setTimeout(this.delayedInit, 250);
  }

  render = () => {
    //  ReactDOM.render(<QuarumWidget {...this.props} />, this.elem);
  };

  delayedInit = () => {
    Fingerprint2.get(components => {
      console.log('FINGERPRINT:', components); // an array of components: {key: ..., value: ...}
    });

    this.widgets = new LiveWidgets(this);
    this.pageTracker.subscribe(this.pageWatcher);

    this.live = new LiveSocket('ws://localhost:8080/live/', this);
    this.live.getConnection().then(v => {
      this.pageTracker.watchLocationHref(500);
    });
  };

  // Track any page activity with the server
  pageWatcher: PartialObserver<PageEvent> = {
    next: (evt: PageEvent) => {
      if (!this.live) {
        return;
      }
      const msg = evt.isNewPage
        ? {
            action: EventType.PageLoad,
            key: evt.page,
          }
        : {
            action: EventType.ParamsChanged,
            key: evt.page,
            info: {
              query: evt.query,
            },
          };
      this.live.send(msg);
    },
  };
}