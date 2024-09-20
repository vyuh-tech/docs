import type { Props } from 'astro'
import type { FunctionComponent } from 'react'

export const PubBadge: FunctionComponent<Props> = (props) => {
  const { name, inline } = props

  return (
    <a
      href={`https://pub.dev/packages/${name}`}
      className={inline ? 'inline-block px-1' : 'block pb-4'}
    >
      <img
        alt="pub"
        src={`https://img.shields.io/pub/v/${name}.svg?label=${name}&logo=dart&color=blue&style=for-the-badge`}
      />
    </a>
  )
}
