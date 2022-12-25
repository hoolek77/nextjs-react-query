import type { TippyProps } from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react/headless'
import type { ReactElement } from 'react'

import styled from 'styled-components'

export interface TooltipProps {
  children: ReactElement
  content: ReactElement
  placement?: TippyProps['placement']
}

export default function Tooltip({
  children,
  content,
  placement = 'top',
}: TooltipProps) {
  return (
    <Tippy
      render={(attrs) => <TooltipWrapper {...attrs}>{content}</TooltipWrapper>}
      placement={placement}
    >
      {children}
    </Tippy>
  )
}

const TooltipWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme: { colors } }) => colors.neutral};
  padding: 8px 16px;
  color: ${({ theme: { colors } }) => colors.secondary};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  transition: all 0.2s;
`
