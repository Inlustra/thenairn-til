import gulp from "gulp";
import path from "path";
import { outDir, assetsDir, ASSETS_DIRECTORY } from "./paths";

const assetsGlob = path.join(assetsDir, "**/*");
const assetsOut = path.join(outDir, ASSETS_DIRECTORY);

export function copyAssets() {
  return gulp.src(assetsGlob).pipe(gulp.dest(assetsOut));
}

export const watchCopyAssets = gulp.series(
  copyAssets,
  function watchMergePackageJson() {
    gulp.watch(assetsGlob, gulp.series(copyAssets));
  }
);
