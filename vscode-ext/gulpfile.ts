import gulp from "gulp";
import {
  watchMergePackageJson,
  mergePackageJson
} from "./gulp/merge-package-json.gulp";
import { copyAssets, watchCopyAssets } from "./gulp/copy-assets.gulp";

export { copyAssets } from "./gulp/copy-assets.gulp";

export {
  mergePackageJson,
  watchMergePackageJson
} from "./gulp/merge-package-json.gulp";

export const build = gulp.parallel(copyAssets, mergePackageJson);
export const watch = gulp.parallel(watchMergePackageJson, watchCopyAssets);
