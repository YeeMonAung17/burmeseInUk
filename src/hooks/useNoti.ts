import notifee from '@notifee/react-native'

export const useNoti = () => {
  const showNoti = async (title: string, body: string) => {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    })
  }

  return { showNoti }
}
