import * as crypto from 'crypto';
import {config} from '../../config';

export function passwordHash(password: string) {
	return crypto.createHmac('sha256', config.salt)
		.update(password)
		.digest('hex');
}