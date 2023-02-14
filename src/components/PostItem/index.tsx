import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { PostsItems } from './styles'

interface IPostItemProps extends HTMLAttributes<HTMLElement> {
  date?: string
  title?: string
  excerpt?: string
  href: string
}

export function PostItem({
  date,
  excerpt,
  title,
  href,
  ...props
}: IPostItemProps) {
  return (
    <PostsItems {...props}>
      <time>{date}</time>
      <Link href={href}>
        <h2>{title}</h2>
        <p>{excerpt}</p>
      </Link>
    </PostsItems>
  )
}
