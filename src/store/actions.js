import API from '@/plugins/API'

export const fetchLatestBlocks = ({commit , dispatch }, from_block_height) => {
    commit('SET_LOADER_STATUS' , true)
    let enpoint
    if(from_block_height === undefined){
        commit('SET_BLOCKS_LIST' , [])
        enpoint = '/blocks'
    }else{
        enpoint = `/blocks/${from_block_height}`
    }
    return new Promise((resolve, reject) => {
        API().get(enpoint).then((response) =>{
            dispatch('addBlocksToState' , response.data)
            resolve(response.data)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const fetchBlockHash = ({commit , dispatch }, block_height) => {
    commit('SET_LOADER_STATUS' , true)
    return new Promise((resolve, reject) => {
        API().get(`/block-height/${block_height}`).then((response) =>{
            dispatch('fetchBlock' , response.data)
            resolve(response.data)
        }).catch((err) =>{
            reject(err)
        })
    })
}

export const fetchBlock = ({ commit }, hash) => {
    return new Promise((resolve, reject) => {
        API().get(`/block/${hash}`).then((response) =>{
            commit('SET_CURRENT_BLOCK' , response.data)
            resolve(response.data)
        }).catch((err) =>{
            reject(err)
        }).finally(() => {
            commit('SET_LOADER_STATUS' , false)
        })
    })
}

export const addBlocksToState = ({ state , commit}, blocks) => {
    let current_blocks = state.blocks
    let updated_blocks = current_blocks.concat(blocks)
    commit('SET_BLOCKS_LIST' , updated_blocks)
    commit('SET_LOADER_STATUS' , false)
}