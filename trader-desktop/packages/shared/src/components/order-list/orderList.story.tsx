import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../test-support/story-decorator';
import { OrderList } from './orderList';

storiesOf('OrderList', module).addDecorator(StoryDecorator);
