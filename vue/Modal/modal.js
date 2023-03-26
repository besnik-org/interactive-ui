
export const closeModal = (uid = 'modal')=>{
    postMessage({author: 'interactive-ui-modal',  action: 'close', uid: uid}, window.origin)
}


export const openModal = (uid = 'modal')=>{
    postMessage({author: 'interactive-ui-modal',   action: 'open', uid: uid}, window.origin)
}