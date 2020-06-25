import dev from './dev.environment';
import prod from './prod.environment';
import staging from './staging.environment';

export const env =
  process.env.NODE_ENV === 'prod' ? prod : process.env.NODE_ENV === 'staging' ? staging : dev;
