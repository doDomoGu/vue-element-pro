import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from '../MyButton';

storiesOf('Lazytree', module)
  .add('Default2', () => ({
    components: { MyButton },
    // eslint-disable-next-line no-unused-vars
    render(h) {
      return <my-button onClick={this.action}>Default 2</my-button>;
    },
    methods: { action: linkTo('clicked') },
  }))
  
