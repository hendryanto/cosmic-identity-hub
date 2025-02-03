#!/usr/bin/env node

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import './index.js';

console.log('Server initialized');