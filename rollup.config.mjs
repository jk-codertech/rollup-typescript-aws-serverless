import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
	input: 'src/lambdaExample.ts',
	output: {
        dir: './dist',
		format: 'cjs'
	},
    plugins: [
        nodeResolve({exportConditions: ["node"]}),
        commonjs(),
        json(),
        typescript({tsconfig: './tsconfig.json'})
    ]
};