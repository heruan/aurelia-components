import gulp from "gulp";
import paths from "vinyl-paths";
import del from "del";
import run from "run-sequence";
import jasmine from "gulp-jasmine";
import reporters from "jasmine-reporters";
import typescript from "typescript";
import gts from "gulp-typescript";
import merge from "merge2";
import tsconfig from "./tsconfig.json";

const tsc = gts(Object.assign({ typescript: typescript }, tsconfig.compilerOptions));
const typescriptSources = [ tsconfig.compilerOptions.rootDir + "/**/*.ts" ];
const typescriptOutput = tsconfig.compilerOptions.outDir;
const testSuites = [ "test/**/*.js" ];
const clean = [ typescriptOutput ];

gulp.task("clean", done => gulp.src(clean).pipe(paths(del)));
gulp.task("build", [ "clean" ], done => {
    let stream = gulp.src(typescriptSources).pipe(tsc);
    return merge([
        stream.js.pipe(gulp.dest(typescriptOutput)),
        stream.dts.pipe(gulp.dest(typescriptOutput))
    ]);
});
gulp.task("test", [ "build" ], done => gulp.src(testSuites).pipe(jasmine()));
gulp.task("default", () => run("build", "test"));
