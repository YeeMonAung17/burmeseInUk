import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import config from 'react-native-config'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

const CONFIG_TYPE = config.APP_CONFIG ?? 'NONE'

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: `Burmese in UK ${CONFIG_TYPE} ${
      Platform.OS === 'ios' ? 'iOS' : 'Android'
    }`,
    host: 'localhost', // Change to your computer's IP if using a physical device
  })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: stackFrame => false },
    overlay: false,
  })
  .use(reactotronRedux())
  .connect()

Reactotron.clear()

export default reactotron

export const connect = () => {
  Reactotron.connect()
}
