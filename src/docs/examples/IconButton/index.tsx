import { Heading, Link } from 'uilib';
import { ComponentLayout } from 'docs/components';

import example from '!!raw-loader!./Example';
import { TypesTable } from 'uilib/docs/components/TypesNavigator/TypesNavigator';

const name = 'IconButton';
const Docs = () => (
  <>
    <p>
      UI button component that can contain only an Icon component.{' '}
      <Link inline href="/demo">
        Demo
      </Link>
    </p>

    <Heading id="Props" text="Props" />
    <TypesTable scope={name} type="Props" />
  </>
);

export default () => (
  <ComponentLayout
    name={name}
    docs={Docs}
    examples={[{ id: 'demo', label: 'Demo', code: example }]}
    scope={{}}
  />
);
