/* eslint-disable */
/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf, copy, ifNotWindows } = require('nps-utils');
const path = require('path');

/**
 * Call another nps action.
 * @example nps('clean.dist')
 */
function nps(action) {
    return `nps ${action}`;
}

/**
 * General tooling related actions
 * @example tools.run('./src/index.ts')
 */
const tools = {
    run: function (path) {
        return `ts-node ${path}`;
    },
    webpack: function () {
        return `webpack`;
    },
    jest: function () {
        // Only for POSIX Based OSes, if a test file (withing test folder and ending in .test.ts)
        // contains the .only key, run exclusively that file, else, run all files as default behavior.
        // This fixes the ugly behavior of jest running all tests always, even on .only.
        // This does not work in Windows, which defaults to running all tests.
        return ifNotWindows(
            'if grep -l "\\.only" ./test/**/*.test.ts; ' +
                'then grep -l "\\.only" ./test/**/*.test.ts | xargs jest; ' +
                'else jest --coverage; ' +
                'fi',
            'jest --coverage'
        );
    },
    typedoc: function (path) {
        return `typedoc`;
    },
    eslint: function (path) {
        return `eslint ${path} --format stylish --ext ts --color`;
    },
    prettier: function (path) {
        return `prettier --write ${path}`;
    }
};

/**
 * Server related stuff, useful for serving docs and reports
 * @example server.serve('./coverage')
 */
const server = {
    serve: function (path) {
        return `serve ${path}`;
    }
};

/**
 * File related stuff
 * @example files.copy('./src', './dist')
 */
const files = {
    rename: function (src, dest) {
        return `move-file ${src} ${dest}`;
    },
    delete: function (src) {
        return rimraf(src);
    },
    copy: function (src, dest) {
        const destFolder = path.dirname(dest);
        const destFile = path.basename(dest);
        if (!destFile) {
            return copy(`${src} ${dest}`);
        } else {
            return copy(`${src} ${destFolder} --rename ${destFile}`);
        }
    },
    chmod: function (args, file) {
        return `chmod ${args} ${file}`;
    }
};

module.exports = {
    scripts: {
        default: nps('start'),
        /*
         * Run the index in development mode
         */
        start: {
            script: tools.run('./src/index.ts'),
            description: 'Run the index in development mode'
        },
        /*
         * Build the application for deployment
         */
        build: {
            script: series(nps('clean.dist'), tools.webpack()),
            description: 'Build the application into the dist folder'
        },
        /*
         * Run the tests
         */
        test: {
            script: series(nps('clean.coverage'), nps('lint'), tools.jest()),
            description: 'Run the index in development mode',
            serve: {
                script: series(nps('test'), server.serve('./coverage')),
                description: 'Serve the coverage report produced by jest'
            }
        },
        /**
         * Helpers
         */
        clean: {
            dist: {
                script: files.delete('./dist'),
                description: 'Delete the dist folder',
                hiddenFromHelp: true,
                silent: true
            },
            docs: {
                script: files.delete('./docs'),
                description: 'Delete the docs folder',
                hiddenFromHelp: true,
                silent: true
            },
            coverage: {
                script: files.delete('./coverage'),
                description: 'Delete the coverage folder',
                hiddenFromHelp: true,
                silent: true
            }
        },
        prettify: {
            script: tools.prettier('./src/**/*.ts'),
            description: 'Run Prettier on all the files',
            hiddenFromHelp: true
        },
        lint: {
            script: series(tools.eslint('./src'), tools.eslint('./test')),
            description: 'Run ESLint on all the files',
            hiddenFromHelp: true
        },
        doc: {
            script: series(
                nps('clean.docs'),
                tools.typedoc(),
                files.copy('./docs/index.html', './docs/globals.html')
            ),
            description: 'Run Typedoc and generate docs',
            hiddenFromHelp: true,
            serve: {
                script: series('nps doc', server.serve('./docs')),
                description: 'Generate and serve the docs as static files',
                hiddenFromHelp: true
            }
        }
    }
};
