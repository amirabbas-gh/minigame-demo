import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMinicodeConfig } from '../../eslint.minicode.mjs';

const configDir = path.dirname(fileURLToPath(import.meta.url));

export default createMinicodeConfig(configDir);
