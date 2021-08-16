module.exports = {
    SET_BLOCKS_LIST: (state, list) => {
        state.blocks = list
    },
    SET_CURRENT_BLOCK: (state, block) => {
        state.currentBlock = block
    },
    SET_LOADER_STATUS: (state , status) => {
        state.loaderStatus = status
    }
}