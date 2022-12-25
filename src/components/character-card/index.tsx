import { memo } from 'react'

import NextImage from 'next/image'

import type { Character } from '@/types/common'

import styled, { css } from 'styled-components'

interface CharacterCardProps extends Character {
  selected?: boolean
  onSelect: (id: number) => void
}

export const CHARACTER_CARD_WIDTH = 168

function CharacterCard({
  episode,
  id,
  name,
  status,
  image,
  selected = true,
  onSelect,
}: CharacterCardProps) {
  return (
    <CharacterCardWrapper selected={selected} onClick={() => onSelect(id)}>
      <ImageWrapper>
        <Image
          src={image}
          alt={name}
          fill
          sizes={`${CHARACTER_CARD_WIDTH - 4}px`}
          priority
        />
      </ImageWrapper>
      <CharacterCardInfoWrapper>
        <CharacterCardInfo>{name}</CharacterCardInfo>
        <CharacterCardInfo>{status}</CharacterCardInfo>
        <CharacterCardInfo>
          <CharacterCardEpisode>
            Played in{' '}
            {`${episode.length} episode${episode.length > 1 ? 's' : ''}`}
          </CharacterCardEpisode>
        </CharacterCardInfo>
      </CharacterCardInfoWrapper>
    </CharacterCardWrapper>
  )
}

export default memo(CharacterCard)

const CharacterCardWrapper = styled.button<{ selected: boolean }>`
  width: ${CHARACTER_CARD_WIDTH}px;
  height: fit-content;
  background-color: ${({ theme: { colors } }) => colors.secondary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${({ theme: { colors } }) => colors.secondary};
  transition: border 0.2s ease-in-out;
  margin: 0;
  padding: 0;
  outline: none;
  cursor: pointer;

  ${({ selected, theme: { colors } }) =>
    selected &&
    css`
      border: 2px solid ${colors.success};
    `}

  &:focus-visible {
    box-shadow: 0px 0px 0px 2.5px ${({ theme: { colors } }) => colors.primary};
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: ${CHARACTER_CARD_WIDTH - 4}px;
  position: relative;
  border-radius: 8px 8px 0 0;
  position: relative;
`

const Image = styled(NextImage)`
  border-radius: 8px 8px 0 0;
`

const CharacterCardInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  gap: 4px;
  text-align: center;
`

const CharacterCardInfo = styled.p`
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: ${({ theme: { colors } }) => colors.textPrimary};
`

const CharacterCardEpisode = styled.span`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  text-decoration-color: ${({ theme: { colors } }) => colors.primary};
`
