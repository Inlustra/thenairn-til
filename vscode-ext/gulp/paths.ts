import path from 'path';

/**
 * PATHS
 */

export const ROOT = './';
export const SRC_DIRECTORY = 'src';
export const DIST_DIRECTORY = 'dist';
export const OUT_DIRECTORY = 'out';

export const srcDir = path.relative(ROOT, SRC_DIRECTORY);
export const distDir = path.relative(ROOT, DIST_DIRECTORY);
export const outDir = path.relative(ROOT, OUT_DIRECTORY);