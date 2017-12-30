const dev = process.argv[2] ? (process.argv[2].indexOf('development') !== -1) || (process.argv[2].indexOf('production') === -1) : true

const {
    FuseBox,
    TypeScriptHelpers,
    UglifyESPlugin
} = require('fuse-box')

const fuseBoxConfig = {
    homeDir: 'src',
    output: 'dist/js/$name.js',
    plugins: [
        TypeScriptHelpers(),
    ],
    experimentalFeatures: true 
}

if (!dev) {
    fuseBoxConfig.plugins.push(UglifyESPlugin())
}

const fuse = FuseBox.init(fuseBoxConfig)

const extension = fuse.bundle('panel')
    .instructions('>panel.ts')

if (dev) {
    extension.watch()
}

fuse.run()
