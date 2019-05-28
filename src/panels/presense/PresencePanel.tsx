// Libraries
import React, {PureComponent} from 'react';

// Types
import {PresenseOptions} from './types';
import {PanelProps} from '@grafana/ui';
import {plugin as app} from '../../module';
import {ShowPresense} from 'components/ShowPresense';

export interface Props extends PanelProps<PresenseOptions> {}

export class PresencePanel extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ShowPresense app={app} />
      </div>
    );
  }
}
