let common = {
    entryPoints: [
        "./src/atlassian/addCreatePullRequestDesctiptionButton.js",
        "./src/azureDevops/addCreateBranchNameButton.js",
        "./src/optionsPage/options.js"
    ],
    bundle: true,
    target: ["chrome108", "firefox109"],
};
let chromeBuild = {
    ...common,
    outdir: './build/chrome',
    define: {
        ENV: JSON.stringify("chrome")
    }
};
let firefoxBuild = {
    ...common,
    outdir: './build/firefox',
    define: {
        ENV: JSON.stringify("firefox")
    }
};

let builds = {
    "chrome": chromeBuild,
    "firefox": firefoxBuild
};

require('esbuild').build(builds[process.argv[2]]).catch(() => process.exit(1))