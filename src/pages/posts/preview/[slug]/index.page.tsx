/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticPaths, GetStaticProps } from 'next'
import { PaywallSubscribeButton } from '../../../../components/PaywallSubscribeButton'
import { getPrismicClient } from '../../../../services/prismic'
import {
  SpecificPostsContainer,
  SpecificPostsContent,
  SpecificPostsInnerContainer,
} from './styles'
import * as prismicH from '@prismicio/helpers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface IPost {
  slug: string
  title: string
  content: string
  updatedAt: string
}

interface IPostProps {
  post: IPost
}

export default function Post({ post }: IPostProps) {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{`ig.news | ${post.title} `}</title>
      </Head>

      <SpecificPostsContainer>
        <SpecificPostsInnerContainer>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <SpecificPostsContent
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <PaywallSubscribeButton />
        </SpecificPostsInnerContainer>
      </SpecificPostsContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient({})
  const postsResponse = await prismic.getByUID('posts', slug.toString())

  const post = {
    slug: postsResponse.uid,
    title: prismicH.asText(postsResponse.data.title),
    content: prismicH.asHTML(postsResponse.data.content.slice(0, 4)),
    updatedAt: new Date(postsResponse.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
