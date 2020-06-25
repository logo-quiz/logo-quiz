import dev from './dev.environment';
import prod from './prod.environment';
import staging from './staging.environment';

console.log(process.env.NODE_ENV);

export const env =
  process.env.NODE_ENV === 'prod' ? prod : process.env.NODE_ENV === 'staging' ? staging : dev;
