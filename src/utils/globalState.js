import { initGlobalState } from 'qiankun';

const initState = {
    version: '1.0',
    user: 'Tse',
    pwd: '123',
}

const microAppStateActions = initGlobalState(initState)

microAppStateActions.onGlobalStateChange((state, prev) => {
    console.log('listening global state changed from main application', state, prev)
})

export default microAppStateActions
