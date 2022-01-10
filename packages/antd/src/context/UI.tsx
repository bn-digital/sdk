import { FC } from 'react'
import { ConfigProvider } from 'antd'

type UIProps = { locale: string }

const UIProvider: FC<Partial<UIProps>> = ({ locale = 'en', children }) => {
  return <ConfigProvider locale={{ locale }}>{children}</ConfigProvider>
}

export { UIProvider }
