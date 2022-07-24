import { ComponentLayout, Code, TypesNavigator } from 'docs/components';

import example from '!!raw-loader!./Example';

export default () => (
  <ComponentLayout
    name="Link"
    code={<Code code={example} />}
    api={<TypesNavigator scope="Link" type="Props" />}
  />
);
