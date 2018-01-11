const dev = process.argv[2] ? (process.argv[2].indexOf('development') !== -1) || (process.argv[2].indexOf('production') === -1) : true
const fs = require('fs-extra')

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

const panel = fuse.bundle('panel')
    .instructions('>panel.ts')
    
const content = fuse.bundle('content')
    .instructions('>content.ts')
    
const background = fuse.bundle('background')
    .instructions('>background.ts')
    
const popup = fuse.bundle('popup')
    .instructions('>popup.ts')

if (dev) {
    fs.watch('src/build/default_manifest.json', {}, _ => {
        updateManifest()
    })
    panel.watch()
    content.watch()
    background.watch()
    popup.watch()
}

browserPolyfill()
updateManifest()
fuse.run()

function updateManifest () {
    fs.copySync('src/build/default_manifest.json', 'dist/manifest.json')
}

function browserPolyfill () {
    if (!fs.pathExistsSync('dist/js/browser-polyfill.min.js')) {
        fs.copySync('node_modules/webextension-polyfill/dist/browser-polyfill.min.js', 'dist/js/browser-polyfill.min.js')
    }
}
