import { HexMap } from "./hexMap/hexMap";


const PIXI = require('pixi.js')
const Viewport = require('pixi-viewport')
const UserPlugin = require('pixi-viewport')
const dat = require('dat.gui')

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

let app, viewport


app = new PIXI.Application({ transparent: true, width: window.innerWidth, height: window.innerHeight, resolution: window.devicePixelRatio })
document.body.appendChild(app.view)
app.view.style.position = 'fixed'
app.view.style.width = '100vw'
app.view.style.height = '100vh'

let options = {
    worldWidth: 2000,
    worldHeight: 1200,
    hexSize: 40,
    flat: true,
    render: drawWorld
}

makeWorldViewport()
resize()
window.addEventListener('resize', resize)

createGui()
drawWorld()

function makeWorldViewport()
{
    viewport = app.stage.addChild(new Viewport({
        interaction: app.renderer.plugins.interaction,
        passiveWheel: false
    }))
    viewport
        .drag({ clampWheel: true })
        .wheel({ smooth: 2 })
        .pinch()
    viewport.userPlugin('test', new UserPlugin(viewport))
}

function resize()
{
    app.renderer.resize(window.innerWidth, window.innerHeight)
    viewport.resize(window.innerWidth, window.innerHeight, options.worldWidth, options.worldHeight)
}

function drawWorld()
{
    viewport.removeChildren()
    viewport.moveCorner(0, 0)
    viewport.fitWorld();
    let hexMap = new HexMap()
        .setHexSize(options.hexSize)
        .setFlat(options.flat)
        .setWorldSize(options.worldWidth, options.worldHeight)
        .align()
        .draw();
    viewport.addChild(hexMap);

}

function createGui() {
    let gui = new dat.GUI();
    gui.add(options, 'worldWidth', 0, 10000);
    gui.add(options, 'worldHeight', 0, 10000);
    gui.add(options, 'hexSize', 10, 200);
    gui.add(options, 'flat', [true,false]);
    gui.add(options, 'render');
}