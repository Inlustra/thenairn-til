import gulp from "gulp";
import path from "path";
import merge from "gulp-merge-json";
import { srcDir, distDir, ROOT, outDir } from "./paths";

const packageJsonGlobs = [
  path.join(srcDir, "/**/package.json"),
  path.join(ROOT, "package.json")
];

export function mergePackageJson() {
  return gulp
    .src(packageJsonGlobs)
    .pipe(
      merge({
        fileName: "package.json"
      })
    )
    .pipe(gulp.dest(outDir));
}

export const watchMergePackageJson = gulp.series(
  mergePackageJson,
  function watchMergePackageJson() {
    gulp.watch(packageJsonGlobs, gulp.series(mergePackageJson));
  }
);
