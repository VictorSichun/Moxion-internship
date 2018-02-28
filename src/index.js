import './app'

import './style.scss'

function requireAll(r) {
    r.keys().forEach(r)
}
requireAll(require.context('./components', true, /\.js$/))
requireAll(require.context('./services', true, /\.js$/))
