import type { Props } from 'astro'
import type { FunctionComponent } from 'react'

export const NpmBadge: FunctionComponent<Props> = (props) => {
  const { name, inline } = props

  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      className={inline ? 'inline-block px-1' : 'block pb-4'}
    >
      <img
        alt="npm"
        src={`https://img.shields.io/npm/v/${name}.svg?label=${name}&logo=npm&color=red&style=for-the-badge`}
      />
    </a>
  )
}