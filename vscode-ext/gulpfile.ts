import gulp from "gulp";
import {
  watchMergePackageJson,
  mergePackageJson
} from "./gulp/merge-package-json.gulp";

export {
  mergePackageJson,
  watchMergePackageJson
} from "./gulp/merge-package-json.gulp";

export const build = gulp.parallel(mergePackageJson);
export const watch = gulp.parallel(watchMergePackageJson);
