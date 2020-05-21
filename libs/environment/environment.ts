import dev from './dev.environment';
import prod from './prod.environment';

export const env = process.env.NODE_ENV === 'prod' ? prod : dev;
