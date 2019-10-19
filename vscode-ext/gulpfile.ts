import gulp from "gulp";
import { watchMergePackageJson } from "./gulp/merge-package-json.gulp";

export {
  mergePackageJson,
  watchMergePackageJson
} from "./gulp/merge-package-json.gulp";

export const watch = gulp.parallel(watchMergePackageJson);
