const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}

const mount = (vnode, container) => {
  // 创建el,并且在vnode赋予真实的el，为了方面后面继续操作真实dom
  const el = vnode.el = document.createElement(vnode.tag)
  if(vnode.props) {
    for (const key in vnode.props) {
      let value = vnode.props[key]
      if(key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  if (vnode.children) {
    if (typeof(vnode.children) === 'string' ) {
      el.textContent = vnode.children
    } else {
      // for (const item of vnode.children) {
      //   mount(item, el)
      // }
      vnode.children.forEach(item => {
        mount(item, el)
      })
    }
  }

  container.appendChild(el)
}