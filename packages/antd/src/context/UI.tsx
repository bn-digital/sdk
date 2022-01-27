import { FC } from 'react'
import { ConfigProvider } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { Theme } from 'antd/es/config-provider/context'
import { RenderEmptyHandler } from 'antd/es/config-provider'

type UIProps = { locale: string; theme: 'default' | 'light' | 'dark'; size: SizeType; colors: Theme; emptyComponents: RenderEmptyHandler }

const UIProvider: FC<Partial<UIProps>> = ({ locale = 'en', colors, emptyComponents, size = 'middle', children }) => {
  ConfigProvider.config({ theme: colors })
  return (
    <ConfigProvider renderEmpty={emptyComponents} componentSize={size} locale={{ locale }}>
      {children}
    </ConfigProvider>
  )
}

export { UIProvider }
